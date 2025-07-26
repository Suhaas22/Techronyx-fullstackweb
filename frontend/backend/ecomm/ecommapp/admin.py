from django.contrib import admin

# Register your models here.
from .models import Product, ProductDetail, CartItem

admin.site.register(CartItem)


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['title', 'rating', 'reviews', 'old_price', 'new_price', 'discount', 'offer', 'bestseller']

@admin.register(ProductDetail)
class ProductDetailAdmin(admin.ModelAdmin):
    list_display = ['product', 'stock_status']


