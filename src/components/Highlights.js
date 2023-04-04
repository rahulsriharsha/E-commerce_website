import { Row, Col, Card } from 'react-bootstrap';

export default function Highlights() {
	return (
		<Row>
			{/* 1st Card */}
			<Col xs={12} md={4}>
				<Card className="cardHighlight p-3">
			      <Card.Body>
			        <Card.Title>
			        	<h2 class="text-center">One-Stop Online Marketplace</h2>
			        </Card.Title>
			        <Card.Text>
			          A platform that offers a wide variety of products from different brands and sellers. It could feature categories such as fashion, beauty, home and garden, electronics, and toys, and allow customers to browse and compare prices, read reviews, and make purchases directly from the website.
			        </Card.Text>
			      </Card.Body>
			    </Card>
			</Col>
			{/* 2nd Card */}
			<Col xs={12} md={4}>
				<Card className="cardHighlight p-3">
			      <Card.Body>
			        <Card.Title>
			        	<h2>Curated Luxury Shopping Experience</h2>
			        </Card.Title>
			        <Card.Text>
			          This website could focus on high-end products and offer a personalized shopping experience for customers. It could feature designer brands, limited edition items, and exclusive collections, and offer services such as personal stylists, custom fittings, and luxury gift wrapping.
			        </Card.Text>
			      </Card.Body>
			    </Card>
			</Col>
			{/* 3rd Card */}
			<Col xs={12} md={4}>
				<Card className="cardHighlight p-3">
			      <Card.Body>
			        <Card.Title>
			        	<h2>Specialty Online Store</h2>
			        </Card.Title>
			        <Card.Text>
			          This website could specialize in a particular product category or niche market, offering a unique and focused shopping experience. It could feature products such as organic and natural foods, handmade artisanal crafts, or vintage and antique items, and offer educational resources and community forums for customers with shared interests.
			        </Card.Text>
			      </Card.Body>
			    </Card>
			</Col>
		</Row>
	)
}