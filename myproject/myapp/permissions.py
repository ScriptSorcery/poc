from rest_framework import permissions

class IsAuthenticatedOrCreateOnly(permissions.BasePermission):
    """
    Custom permission to allow authenticated users to create users.
    """

    def has_permission(self, request, view):
        # Allow POST requests (user creation) without authentication
        if request.method == 'POST':
            return True
        
        # Check for authenticated user for all other methods
        return request.user and request.user.is_authenticated
