from django.urls import path
from .views import home,Post_products,Get_Products,Del_products,Edit_product


urlpatterns = [
    path("",home),
    path("api/post-products/",Post_products),
    path("api/get-products/",Get_Products),
    path("api/del-pro/<int:p_id>/",Del_products),
    path("api/edit-product/<int:e_id>/",Edit_product)
]



