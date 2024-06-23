from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .permissions import IsAuthenticatedOrCreateOnly
from .mixins import RawSQLMixin
from rest_framework_simplejwt.views import TokenObtainPairView

class OrganizationListCreateView(RawSQLMixin, APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get(self, request):
        query = "SELECT * FROM myapp_organization"
        organizations = self.fetch_records(query)
        return Response(organizations)

    def post(self, request):
        query = "INSERT INTO myapp_organization (name) VALUES (%s) RETURNING *"
        organization = self.create_record(query, [request.data['name']])
        return Response(organization[0])

    def get_permissions(self):
        if self.request.method == 'GET':
            return [permissions.AllowAny()]
        return super().get_permissions()

class UserListCreateView(RawSQLMixin, APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get(self, request):
        query = """
            SELECT u.id, u.username, u.email, u.organization_id, o.name as organization_name
            FROM myapp_user u
            JOIN myapp_organization o ON u.organization_id = o.id
        """
        users = self.fetch_records(query)
        return Response(users)

    def post(self, request):
        query = """
            INSERT INTO myapp_user (username, email, password, organization_id)
            VALUES (%s, %s, %s, %s) RETURNING *
        """
        user = self.create_record(query, [
            request.data['username'],
            request.data['email'],
            request.data['password'],
            request.data['organization']
        ])
        return Response(user[0])

    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAuthenticatedOrCreateOnly()]
        return super().get_permissions()

    def perform_create(self, serializer):
        serializer.save()

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        
        # Add custom claims
        token['organization_id'] = user.organization.id
        return token

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer