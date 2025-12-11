console.log("connected ")

let Edit_products_btn = document.getElementById("Edit_products_btn");
let Add_products_btn = document.getElementById("Add_products_btn");
let Form_submit = document.getElementById("Form");
let table_body = document.getElementById("employee-tbody");


Edit_products_btn.style.display = "none";

function Load_products() {
    async function GEt() {
        try {
            let get_url = await fetch("/api/get-products/");
            let response = await get_url.json();
            console.log(response);

            let data = response.pro;

            document.getElementById("product-count").textContent = data.length

            table_body.innerHTML = ""
            data.forEach((element) => {

                table_body.innerHTML
                    += `
    <tr>  
        <td data-label="ID">${element.id}</td>
        <td data-label="Product">${element.name}</td>
        <td data-label="Description">${element.desc}</td>
        <td data-label="Price">$${element.price}</td>
        <td data-label="Image" class="image-cell">
            <div class="image-wrapper">
                <img src="${element.img}" 
                     alt="${element.name}" 
                     onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&h=150&fit=crop&crop=center'"
                     loading="lazy"/>
            </div>
        </td>
        <td data-label="Actions">
            <div class="actions">
                <button class="emp-edit-btn" data-id="${element.id}" onclick="Edit_product(${element.id})">
                    <i class="fas fa-edit"></i> Edit
                </button> 
                <button class="emp-delete-btn" data-id="${element.id}" onclick="Delete_product(${element.id})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        </td>
    </tr> 
`;
            })
        }
        catch (err) {
            console.log(err);
        }
    }
    GEt()
};

async function Edit_product(id) {

    Edit_products_btn.style.display = "block";
    Add_products_btn.style.display = "none";

    let get_p = await fetch("/api/get-products/")
    let get_res = await get_p.json()

    console.log(get_res.pro)
    let Edited_pro = get_res.pro.find(x => x.id == id);

    document.getElementById("p_name").value = Edited_pro.name
    document.getElementById("p_desc").value = Edited_pro.desc
    document.getElementById("p_price").value = Edited_pro.price
    document.getElementById("p_cat").value = Edited_pro.cat
    document.getElementById("p_img").value = Edited_pro.img

    Edit_products_btn.addEventListener("click", () => {

        async function edit() {
            let edited_products_to_server = {
                name: document.getElementById("p_name").value,
                desc: document.getElementById("p_desc").value,
                price: document.getElementById("p_price").value,
                categeory: document.getElementById("p_cat").value,
                image: document.getElementById("p_img").value
            }
            let url = await fetch(`api/edit-product/${id}/`, {
                method: "PUT",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(edited_products_to_server)
            })
            let edit_res = await url.json();
            console.log(edit_res);
            Load_products()
        }
        edit()
    })
};

async function Delete_product(id) {
    confirm("conform yes to delete....")

    if (confirm) {
        try {
            let del_url = await fetch(`/api/del-pro/${id}/`, {
                method: "DELETE"
            });
            let res = await del_url.json();
            console.log(res, "del");

            Load_products();
        }
        catch (error) {
            console.error('Error deleting product:', error);
            alert('Failed to delete product. Please try again.');
        }
    }


}


document.getElementById("Add_products_btn").addEventListener("click", (event) => {
    event.preventDefault();
    let New_Products = {
        p_name: document.getElementById("p_name").value,
        p_desc: document.getElementById("p_desc").value,
        p_price: document.getElementById("p_price").value,
        p_cat: document.getElementById("p_cat").value,
        p_img: document.getElementById("p_img").value
    }

    try {
        async function Post() {
            let url = await fetch("/api/post-products/", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(New_Products)
            })
            let result = await url.json();
            console.log(result);

        }
        Post();
    }
    catch (err) {
        console.log(err);
    }
    document.getElementById("Form").reset()
    setTimeout(() => {
        Load_products();
    }, 200);
});


document.addEventListener("DOMContentLoaded", Load_products)

