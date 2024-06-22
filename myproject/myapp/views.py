from rest_framework import generics, permissions
from .models import Organization, User
from .serializers import OrganizationSerializer, UserSerializer
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

class OrganizationListCreateView(generics.ListCreateAPIView):
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer
    permission_classes = [permissions.IsAuthenticated]

class UserListCreateView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
