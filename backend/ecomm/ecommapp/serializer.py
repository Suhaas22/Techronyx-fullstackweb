from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import CartItem, Product, ProductDetail


# user serializers


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin']

    def get_name(self, obj):
        firstname = obj.first_name
        lastname = obj.last_name
        name = f"{firstname} {lastname}".strip()
        return name or obj.email[:5]

    def get__id(self, obj):
        return obj.id

    def get_isAdmin(self, obj):
        return obj.is_staff


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta(UserSerializer.Meta):
        fields = UserSerializer.Meta.fields + ['token']

    def get_token(self, user):
        token = RefreshToken.for_user(user)
        return str(token.access_token)



# product detail serializers

class ProductDetailSerializer(serializers.ModelSerializer):
    title = serializers.CharField(source='product.title', read_only=True)
    image1 = serializers.SerializerMethodField()
    image2 = serializers.SerializerMethodField()
    image3 = serializers.SerializerMethodField()
    image4 = serializers.SerializerMethodField()
    gallery1 = serializers.SerializerMethodField()
    gallery2 = serializers.SerializerMethodField()
    gallery3 = serializers.SerializerMethodField()
    gallery4 = serializers.SerializerMethodField()

    class Meta:
        model = ProductDetail
        fields = [
            'id',
            'product',
            'title',
            'image1', 'image2', 'image3', 'image4',
            'gallery1', 'gallery2', 'gallery3', 'gallery4',
            'rating', 'reviews', 'new_price', 'old_price',
            'discount', 'offer', 'stock_status', 'description'
        ]

    def get_image1(self, obj):
        request = self.context.get('request')
        return request.build_absolute_uri(obj.image1.url) if obj.image1 else None

    def get_image2(self, obj):
        request = self.context.get('request')
        return request.build_absolute_uri(obj.image2.url) if obj.image2 else None

    def get_image3(self, obj):
        request = self.context.get('request')
        return request.build_absolute_uri(obj.image3.url) if obj.image3 else None

    def get_image4(self, obj):
        request = self.context.get('request')
        return request.build_absolute_uri(obj.image4.url) if obj.image4 else None

    def get_gallery1(self, obj):
        request = self.context.get('request')
        return request.build_absolute_uri(obj.gallery1.url) if obj.gallery1 else None

    def get_gallery2(self, obj):
        request = self.context.get('request')
        return request.build_absolute_uri(obj.gallery2.url) if obj.gallery2 else None

    def get_gallery3(self, obj):
        request = self.context.get('request')
        return request.build_absolute_uri(obj.gallery3.url) if obj.gallery3 else None

    def get_gallery4(self, obj):
        request = self.context.get('request')
        return request.build_absolute_uri(obj.gallery4.url) if obj.gallery4 else None


# product serializer

class ProductSerializer(serializers.ModelSerializer):
    details = ProductDetailSerializer(read_only=True)
    image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = '__all__'

    def get_image(self, obj):
        request = self.context.get('request')
        return request.build_absolute_uri(obj.image.url) if obj.image else None

# cart item serializer

class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(), write_only=True, source='product'
    )

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'product_id', 'quantity']
        
def create(self, validated_data):
    user = self.context["request"].user
    print("request.user:", user)
    product = validated_data["product"]
    quantity = validated_data["quantity"]

    cart_item, created = CartItem.objects.get_or_create(
        user=user, product=product,
        defaults={"quantity": quantity}
    )

    if not created:
        # If already exists, update quantity
        cart_item.quantity += quantity
        cart_item.save()

    return cart_item

