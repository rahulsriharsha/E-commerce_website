import { Fragment, useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function AdminView(props){

	
	const { productsData, fetchData } = props;


	const [productsId, setProductsId] = useState("");
	const [products, setProducts] = useState([]);
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState(0);


	const [showEdit, setShowEdit] = useState(false);
	const [showAdd, setShowAdd] = useState(false);


	const openAdd = () => setShowAdd(true);
	const closeAdd = () => setShowAdd(false);


	const openEdit = (productsId) => {


		fetch(`https://s42-45.onrender.com/products/${ productsId }`)
		.then(res => res.json())
		.then(data => {


			setProductsId(data._id);
			setName(data.name);
			setDescription(data.description);
			setPrice(data.price);
		})


		setShowEdit(true);
	};


	const closeEdit = () => {

		setShowEdit(false);
		setName("");
		setDescription("");
		setPrice(0);

	};

	const addProducts = (e) => {

		e.preventDefault()

		fetch(`https://s42-45.onrender.com/products`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${ localStorage.getItem('token') }`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: name,
				description: description,
				price: price
			})
		})
		.then(res => res.json())
		.then(data => {

			if (data === true) {

			
				fetchData();

				
				Swal.fire({
					title: "Success",
					icon: "success",
					text: "Product successfully added."					
				})

				
				setName("")
				setDescription("")
				setPrice(0)

		
				closeAdd();

			} else {

				fetchData();

				Swal.fire({
					title: "Something went wrong",
					icon: "error",
					text: "Please try again."
				})
			}
		})
	}

	const editProducts = (e, productsId) => {
		
		e.preventDefault();

		fetch(`https://s42-45.onrender.com/products/${ productsId }`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${ localStorage.getItem('token') }`
			},
			body: JSON.stringify({
				name: name,
				description: description,
				price: price
			})
		})
		.then(res => res.json())
		.then(data => {

			if (data === true) {

				fetchData();

				Swal.fire({
					title: "Success",
					icon: "success",
					text: "Product successfully updated."
				});

				closeEdit();

			} else {

				fetchData();

				Swal.fire({
					title: "Something went wrong",
					icon: "error",
					text: "Please try again."
				});

			}

		})
	}

	useEffect(() => {

		const archiveToggle = (productsId, isActive) => {

			console.log(!isActive);

			fetch(`https://s42-45.onrender.com/products/${ productsId }/archive`, {
				method: 'PUT',
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${ localStorage.getItem('token') }`
				},
				body: JSON.stringify({
					isActive: !isActive
				})
			})
			.then(res => res.json())
			.then(data => {

				if (data === true) {

					fetchData();

					Swal.fire({
						title: "Success",
						icon: "success",
						text: "Product successfully archived/unarchived."
					});

				} else {

					fetchData();

					Swal.fire({
						title: "Something went wrong",
						icon: "error",
						text: "Please try again."
					});

				}
			})
		}

		const productsArr = productsData.map(products => {

			return(

				<tr key={products._id}>
					<td>{products.name}</td>
					<td>{products.description}</td>
					<td>{products.price}</td>
					<td>
						{/* 
							- If the course's "isActive" field is "true" displays "available"
							- Else if the course's "isActive" field is "false" displays "unavailable"
						*/}
						{products.isActive
							? <span>Available</span>
							: <span>Unavailable</span>
						}
					</td>
					<td>
						<Button
							variant="primary"
							size="sm"
							onClick={() => openEdit(products._id)}
						>
							Update
						</Button>
						{/* 
							- Display a red "Disable" button if course is "active"
							- Else display a green "Enable" button if course is "inactive"
						*/}
						{products.isActive
							?
							<Button 
								variant="danger" 
								size="sm" 
								onClick={() => archiveToggle(products._id, products.isActive)}
							>
								Disable
							</Button>
							:
							<Button 
								variant="success"
								size="sm"
								onClick={() => archiveToggle(products._id, products.isActive)}
							>
								Enable
							</Button>
						}
					</td>
				</tr>

			)

		});


		setProducts(productsArr);

	}, [productsData, fetchData]);

	return(
		<Fragment>

			<div className="text-center my-4">
				<h2>Admin Dashboard</h2>
				<div className="d-flex justify-content-center">
					<Button variant="primary" onClick={openAdd}>Add New Product</Button>			
				</div>			
			</div>

			<Table striped bordered hover responsive>
				<thead className="bg-dark text-white">
					<tr>
						<th>Name</th>
						<th>Description</th>
						<th>Price</th>
						<th>Availability</th>
						<th>Actions</th>
					</tr>					
				</thead>
				<tbody>
					{products}
				</tbody>
			</Table>

		
			<Modal show={showAdd} onHide={closeAdd}>
				<Form onSubmit={e => addProducts(e)}>
					<Modal.Header closeButton>
						<Modal.Title>Add Product</Modal.Title>
					</Modal.Header>
					<Modal.Body>	
						<Form.Group controlId="productsName">
							<Form.Label>Name</Form.Label>
							<Form.Control type="text" value={name} onChange={e => setName(e.target.value)} required/>
						</Form.Group>
						<Form.Group controlId="productsDescription">
							<Form.Label>Description</Form.Label>
							<Form.Control type="text" value={description}  onChange={e => setDescription(e.target.value)} required/>
						</Form.Group>
						<Form.Group controlId="productsPrice">
							<Form.Label>Price</Form.Label>
							<Form.Control type="number" value={price}  onChange={e => setPrice(e.target.value)} required/>
						</Form.Group>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={closeAdd}>Close</Button>
						<Button variant="success" type="submit">Submit</Button>
					</Modal.Footer>
				</Form>
			</Modal>

		
			<Modal show={showEdit} onHide={closeEdit}>
				<Form onSubmit={e => editProducts(e, productsId)}>
					<Modal.Header closeButton>
						<Modal.Title>Edit Product</Modal.Title>
					</Modal.Header>
					<Modal.Body>	
						<Form.Group controlId="productsName">
							<Form.Label>Name</Form.Label>
							<Form.Control type="text" value={name} onChange={e => setName(e.target.value)} required/>
						</Form.Group>
						<Form.Group controlId="productsDescription">
							<Form.Label>Description</Form.Label>
							<Form.Control type="text" value={description}  onChange={e => setDescription(e.target.value)} required/>
						</Form.Group>
						<Form.Group controlId="productsPrice">
							<Form.Label>Price</Form.Label>
							<Form.Control type="number" value={price}  onChange={e => setPrice(e.target.value)} required/>
						</Form.Group>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={closeEdit}>Close</Button>
						<Button variant="success" type="submit">Submit</Button>
					</Modal.Footer>
				</Form>
			</Modal>
			
		</Fragment>
	)
}
