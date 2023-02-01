import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router';
import { useQuery, useMutation } from 'react-query';

import NavbarAdmin from '../components/NavbarAdmin';

import { API } from '../config/api';

export default function UpdateCategoryAdmin() {
  const title = 'Category admin';
  document.title = 'DumbMerch | ' + title;

  let navigate = useNavigate();
  const { id } = useParams();

  // Create Variabel for store category data here ...
  const [category, setCategory] = useState({
    name: ""
  })

  // Create function get category data by id from database here ...
  // let { data } = useQuery('category', async () => {
  //   const response = await API.get('/category/' + id);
  //   setCategory({ name: response.data.data.name })
  //   return response.data.data
  // });

  useEffect(() => {
    (async () => {
      const response = await API.get('/category/' + id);
      setCategory({ name: response.data.data.name })
    })()
  }, [])

  const handleChange = (e) => {
    setCategory({
      ...category,
      name: e.target.value,
    });
  };

  // Create function for handle submit data ...
  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      const response = await API.patch('/category/' + id, category)
      console.log("data berhasil di update", response)
    } catch (err) {
      console.log(err)
    }
  })

  return (
    <>
      <NavbarAdmin title={title} />
      <Container className="py-5">
        <Row>
          <Col xs="12">
            <div className="text-header-category mb-4">Edit Category</div>
          </Col>
          <Col xs="12">
            <form onSubmit={(e) => handleSubmit.mutate(e)}>
              <input
                onChange={handleChange}
                value={category.name}
                placeholder="category"
                className="input-edit-category mt-4"
              />
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
