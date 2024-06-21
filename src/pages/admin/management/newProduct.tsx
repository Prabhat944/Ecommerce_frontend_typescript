import { RootState } from '@reduxjs/toolkit/query';
import React, { ChangeEvent, FormEvent, useState } from 'react'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNewProductMutation } from '../../../redux/api/productAPI';
import { useNavigate } from 'react-router-dom';
import { responseToast } from '../../../utils/features';

const NewProduct = () => {
    const {user} = useSelector((state)=>state.userReducer);
    const [name,setName] = useState<string>();
    const [price,setPrice] = useState<number>();
    const [stock,setStock] = useState<number>();
    const [category,setCategory] = useState<string>();
    const [photoPrev,setPhotoPrev] = useState<string>();
    const [photo,setPhoto] = useState<File>();

    const [newProduct] = useNewProductMutation();
    const navigate = useNavigate();

    const submitHandler = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!name || !price || stock < 0 || !category || !photo )return toast.error("Please fill all fields");

        const formData = new FormData();
        formData.set("name",name);
        formData.set("price",price.toString());
        formData.set("stock",stock.toString());
        formData.set("photo",photo);
        formData.set("category",category);

        const res = await newProduct({id:user._id!,formData});
        console.log("tag",res)
        responseToast(res,navigate,"/admin/product")
    };
    const changeImageHandler = (e:ChangeEvent<HTMLImageElement>) => {
        const file: File | undefined = e.target.files?.[0];

        const reader:FileReader = new FileReader();

        if(file){
            reader.readAsDataURL(file);
            reader.onloadend = () =>{
                if(typeof reader.result === "string"){
                    setPhotoPrev(reader.result);
                    setPhoto(file);
                }
            }
        }
    };
  return (
    <div className='admin-container'>
        {/* <AdminSidebar /> */}
        <main className='product-management'>
            <article>
                <form onSubmit={submitHandler}>
                    <h2>New Product</h2>
                    <div>
                        <label>Name</label>
                        <input 
                          required
                          type='text'
                          placeholder='Name'
                          value={name}
                          onChange={(e:any)=>setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Price</label>
                        <input 
                           required
                           type='number'
                           placeholder='Price'
                           value={price}
                           onChange={(e:any)=>setPrice(+e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Stock</label>
                        <input 
                           required
                           type='number'
                           placeholder='Stock'
                           value={stock}
                           onChange={(e:any)=>setStock(Number(e.target.value))}
                        />
                    </div>
                    <div>
                        <label>Category</label>
                        <input 
                           required
                           type='text'
                           placeholder='eg. camer, laptop etc'
                           value={category}
                           onChange={(e:any)=>setCategory(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Photo</label>
                        <input 
                           required
                           type='file'
                           placeholder='eg. camer, laptop etc'
                           onChange={changeImageHandler}
                        />
                    </div>
                    {photoPrev && <img src={photoPrev} alt="New Image" />}
                    <button type='submit'>Create</button>
                </form>
            </article>
        </main>
      
    </div>
  )
}

export default NewProduct
