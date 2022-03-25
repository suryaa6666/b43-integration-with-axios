import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router';
import { useQuery, useMutation } from 'react-query';

import NavbarAdmin from '../components/NavbarAdmin';
import CheckBox from '../components/form/CheckBox';

import dataProduct from '../fakeData/product';

import { API } from '../config/api';

export default function UpdateProductAdmin() {
  const title = 'Product admin';
  document.title = 'DumbMerch | ' + title;

  let navigate = useNavigate();
  const { id } = useParams();

  const [categories, setCategories] = useState([]); //Store all category data
  const [categoryId, setCategoryId] = useState([]); //Save the selected category id
  const [preview, setPreview] = useState(null); //For image preview
  const [product, setProduct] = useState({}); //Store product data

  // Create Variabel for store product data here ...

  // Create function get product data by id from database here ...
  // Create function get category data by id from database here ...

  // Call function get product with useEffect didMount here ...
  // Call function get category with useEffect didMount here ...

  // Create function for handle if category selected here ...

  // Create function for handle change data on form here ...

  // Create function for handle submit data ...

  // Get category id selected
  useEffect(() => {
    const newCategoryId = product?.categories?.map((item) => {
      return item.id;
    });

    setCategoryId(newCategoryId);
  }, [product]);

  return (
    <>
      <NavbarAdmin title={title} />
      <Container className="py-5">
        <Row>
          <Col xs="12">
            <div className="text-header-category mb-4">Update Product</div>
          </Col>
          <Col xs="12">
            <form>
              {preview && (
                <div>
                  <img
                    src={preview}
                    style={{
                      maxWidth: '150px',
                      maxHeight: '150px',
                      objectFit: 'cover',
                    }}
                    alt="preview"
                  />
                </div>
              )}
              <input
                type="file"
                id="upload"
                name="image"
                hidden
                onChange={handleChange}
              />
              <label for="upload" className="label-file-add-product">
                Upload file
              </label>
              <input
                type="text"
                placeholder="Product Name"
                name="name"
                onChange={handleChange}
                value={form?.name}
                className="input-edit-category mt-4"
              />
              <textarea
                placeholder="Product Desc"
                name="desc"
                onChange={handleChange}
                value={form?.desc}
                className="input-edit-category mt-4"
                style={{ height: '130px' }}
              ></textarea>
              <input
                type="number"
                placeholder="Price (Rp.)"
                name="price"
                onChange={handleChange}
                value={form?.price}
                className="input-edit-category mt-4"
              />
              <input
                type="number"
                placeholder="Stock"
                name="qty"
                onChange={handleChange}
                value={form?.qty}
                className="input-edit-category mt-4"
              />

              <div className="card-form-input mt-4 px-2 py-1 pb-2">
                <div
                  className="text-secondary mb-1"
                  style={{ fontSize: '15px' }}
                >
                  Category
                </div>
                {product &&
                  categories?.map((item, index) => (
                    <label key={index} className="checkbox-inline me-4">
                      <CheckBox
                        categoryId={categoryId}
                        value={item?.id}
                        handleChangeCategoryId={handleChangeCategoryId}
                      />
                      <span className="ms-2">{item?.name}</span>
                    </label>
                  ))}
              </div>

              <div className="d-grid gap-2 mt-4">
                <Button type="submit" variant="success" size="md">
                  Save
                </Button>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
