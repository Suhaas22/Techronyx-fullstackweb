from django.db import models

# Create your models here.
from django.contrib.auth.models import User

class Product(models.Model):
    title = models.CharField(max_length=300)
    image = models.ImageField(upload_to='products/') 
    rating = models.FloatField()
    reviews = models.PositiveIntegerField()
    old_price = models.DecimalField(max_digits=10, decimal_places=2)
    new_price = models.DecimalField(max_digits=10, decimal_places=2)
    discount = models.CharField(max_length=10)
    offer = models.CharField(max_length=100)
    bestseller = models.BooleanField(default=False)

    def __str__(self):
        return self.title


class ProductDetail(models.Model):
    product = models.OneToOneField(Product, on_delete=models.CASCADE, related_name='details')

    image1 = models.ImageField(upload_to='products/details/', null=True, blank=True)
    image2 = models.ImageField(upload_to='products/details/', null=True, blank=True)
    image3 = models.ImageField(upload_to='products/details/', null=True, blank=True)
    image4 = models.ImageField(upload_to='products/details/', null=True, blank=True)

    gallery1 = models.ImageField(upload_to='products/gallery/', null=True, blank=True)
    gallery2 = models.ImageField(upload_to='products/gallery/', null=True, blank=True)
    gallery3 = models.ImageField(upload_to='products/gallery/', null=True, blank=True)
    gallery4 = models.ImageField(upload_to='products/gallery/', null=True, blank=True)

    stock_status = models.CharField(max_length=100)
    offer = models.TextField(default="No current offer")
    description = models.TextField()
    rating = models.CharField(max_length=10, default = "0.0")
    reviews = models.IntegerField(default = 0)
    new_price = models.CharField(max_length=20, default = "0")
    old_price = models.CharField(max_length=20, default = "0")
    discount = models.CharField(max_length=10, default="0%")
    

    def __str__(self):
        return f"Details of {self.product.title}"



class CartItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='cartitems')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True, blank=True)
    quantity = models.PositiveIntegerField(default=1)
    
    class Meta:
        unique_together = ('user', 'product')

    def __str__(self):
        return f"{self.product.title} x {self.quantity}"  

    def total_price(self):
        try:
            return self.quantity * float(self.product.new_price) 
        except:
            return 0.0

