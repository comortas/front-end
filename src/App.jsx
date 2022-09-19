import React from 'react';
import { Route, Routes } from 'react-router';
import { Button, Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import './assets/css/kt.scss';
import Header from './components/header';

const App = () => {
	return (
		<div>
			<Header />
			<Routes>
				<Route
					path="/"
					element={
						<div
							className="d-flex align-items-center justify-content-center flex-column"
							style={{ height: '100vh' }}
						>
							<h2>Welcome to KarmaTheory!</h2>
							<div>
								<Button>Login</Button>
							</div>
							<Card
								className="mt-3"
								style={{
									width: '18rem'
								}}
							>
								<CardBody>
									<CardTitle tag="h5">Card title</CardTitle>
									<CardSubtitle className="mb-2 text-muted" tag="h6">
										Card subtitle
									</CardSubtitle>
									<CardText>
										Some quick example text to build on the card title and make up the bulk of the
										card‘s content.
									</CardText>
									<Button>Button</Button>
								</CardBody>
							</Card>
						</div>
					}
				/>
			</Routes>
		</div>
	);
};

export default App;
