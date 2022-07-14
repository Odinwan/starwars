import {Button, Form} from "react-bootstrap";
import './LogIn.css';
import {useAuthorization} from "../../contexts/withAuthorization";

const LogIn = () => {

    const {authState, authAction} = useAuthorization()
    const {handleLogin, handleChangeLoginField} = authAction
    const {login, password} = authState

    return (
        <div className={'log-in'}>
            <Form method={''}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Login</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter login"
                        value={login}
                        onChange={(event) => handleChangeLoginField('login', event.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(event) => handleChangeLoginField('password', event.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" onClick={handleLogin}>
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default LogIn
