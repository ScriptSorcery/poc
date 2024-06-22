from rest_framework import generics, permissions

from .permissions import IsAuthenticatedOrCreateOnly  # Custom permission class
from .models import Organization, User
from .serializers import OrganizationSerializer, UserSerializer
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

class OrganizationListCreateView(generics.ListCreateAPIView):
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    # Optionally, you can override the method to explicitly allow GET requests
    def get_permissions(self):
        if self.request.method == 'GET':
            return [permissions.AllowAny()]
        return super().get_permissions()
    
class UserListCreateView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]  # Set default permission class

    def get_permissions(self):
        if self.request.method == 'POST':  # Allow POST requests for user creation without authentication
            return [IsAuthenticatedOrCreateOnly()]
        return super().get_permissions()  # Use default permission for other methods

    def perform_create(self, serializer):
        # Customize user creation logic if needed (e.g., setting additional fields)
        serializer.save()