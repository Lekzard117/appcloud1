from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Cliente
from .serializers import ClienteSerializer

@api_view(['POST'])
def login_cliente(request):
    email = request.data.get('email')
    clave = request.data.get('clave')

    if not email or not clave:
        return Response(
            {'error': 'Email y clave son requeridos.'},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        cliente = Cliente.objects.get(email=email, clave=clave)

        # Generar token JWT
        refresh = RefreshToken.for_user(cliente)
        access_token = str(refresh.access_token)

        return Response({
            'message': 'Login exitoso',
            'cliente_id': cliente.id,
            'nombre': cliente.nombre,
            'access': access_token,
            'refresh': str(refresh),
        })
    except Cliente.DoesNotExist:
        return Response(
            {'error': 'Credenciales inválidas'},
            status=status.HTTP_401_UNAUTHORIZED
        )


from .models import Actividad
from .serializers import ActividadSerializer

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def actividades_view(request):
    cliente = request.user  # Gracias a `is_authenticated = True` en tu modelo Cliente

    if request.method == 'GET':
        actividades = Actividad.objects.filter(cliente=cliente)
        serializer = ActividadSerializer(actividades, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ActividadSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(cliente=cliente)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


