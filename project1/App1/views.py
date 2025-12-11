from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Products

# Create your views here.


def home(request):
    return render(request, "home.html")


@api_view(["POST"])
def Post_products(request):
    data = request.data
    print(data)

    Name = request.data.get("p_name")
    Description = request.data.get("p_desc")
    Price = request.data.get("p_price")
    Categeory = request.data.get("p_cat")
    Image = request.data.get("p_img")

    Products.objects.create(
        Product_name=Name,
        Product_desc=Description,
        Product_price=Price,
        Product_cat=Categeory,
        Product_image=Image,
    )
    # in order to get the table use makemigrations and migrate to enable it

    return Response({"msg": "data posted successfully", "data": data})


@api_view(["GET"])
def Get_Products(request):
    # print(request.data,"wertyuio")
    product = Products.objects.all()
    load_product = []
    for i in product:
        load_product.append(
            {
                "id":i.id,
                "name":i.Product_name,
                "desc":i.Product_desc,
                "price":i.Product_price,
                "cat":i.Product_cat,
                "img":i.Product_image,   
            }
        )
    
    return Response({"msg":"data recieved successfully","pro":load_product})


@api_view(["DELETE"])
def Del_products(request,p_id):
    Products.objects.get(id = p_id).delete()
    return Response({"msg":"product deleted succeesfully"})

@api_view(["PUT"])
def Edit_product(request,e_id):
    
    Model_product = Products.objects.get(id=e_id)
    req = request.data
    
    Model_product.Product_name = req["name"]
    Model_product.Product_desc =req["desc"]
    Model_product.Product_price = req["price"]
    Model_product.Product_cat = req["categeory"]
    Model_product.Product_image = req["image"]
    
    Model_product.save()
    return Response({"msg":"product edited and updated successfully "})