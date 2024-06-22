from django.urls import path
from .views import OrganizationListCreateView, UserListCreateView

urlpatterns = [
    path('organizations/', OrganizationListCreateView.as_view(), name='organization-list-create'),
    path('users/', UserListCreateView.as_view(), name='user-list-create'),
]
