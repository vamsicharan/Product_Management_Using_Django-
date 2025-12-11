from django.db import models

# Create your models here.

class Products(models.Model):
    
    Product_name = models.CharField(max_length=60)
    Product_desc= models.TextField()
    Product_price = models.IntegerField()
    Product_cat = models.CharField(max_length=60)
    Product_image = models.CharField(max_length=60)
    
    def __str__(self):
        return self.Product_name
