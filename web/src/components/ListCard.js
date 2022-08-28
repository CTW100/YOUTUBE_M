import Card from 'react-bootstrap/Card';
import moment from 'moment';

function ListCard(props) {
	return (
		<Card style={{ width: '18rem' }}>
			<Card.Img
				variant='top'
				src={`https://youtube-api.run.goorm.io/${props.thumbnail}`}
			/>

			<span>
				{props.minutes} : {props.seconds}
			</span>
			<Card.Body>
				<Card.Title>{props.title}</Card.Title>
				<Card.Text>{props.description}</Card.Text>
				<span>{props.writer} </span>
				<br />
				<span style={{ marginLeft: '3rem' }}> {props.views}</span>
				<span> {moment(props.createdAt).format('MMM Do YY')} </span>
			</Card.Body>
		</Card>
	);
}

export default ListCard;
