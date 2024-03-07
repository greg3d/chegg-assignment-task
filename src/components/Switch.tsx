import {Form} from "react-bootstrap";

interface Props {
    name: string
    value: boolean
    handler: () => void
}

const Switch = ({name, value, handler}: Props) => {
    return (
        <Form>
            <Form.Check // prettier-ignore
                type="switch"
                id={name}
                checked={value}
                onClick={handler}
            />
        </Form>
    );
};

export default Switch;