import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Navigation() {
	return (
		<>
			<Navbar bg='dark' variant='dark'>
				<Container>
					<Navbar.Brand href='/'>Home</Navbar.Brand>
					<Nav className='me-auto'>
						<Nav.Link href='/new'>Create Account</Nav.Link>
						<Nav.Link href='/login'>Login</Nav.Link>
						<Nav.Link href='/logout'>Logout</Nav.Link>
						<Nav.Link href='/products/uploadfile'>
							Upload Video
						</Nav.Link>
					</Nav>
				</Container>
			</Navbar>
		</>
	);
}

export default Navigation;
