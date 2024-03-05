import {FormEvent, useState} from 'react';

interface Props {
    name: string,
    buttonDisabled: boolean,
    handler: (val: string) => void
}

const SearchPanel = (props: Props) => {

    const {name, buttonDisabled, handler} = props;
    const [state, setState] = useState<{ [key: string]: string }>({});

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        handler(state[name]);
    }

    return (
        <div>Search panel</div>
        /*<Form onSubmit={handleSubmit}>
            <InputGroup>
                <Form.Control
                    type={"search"}
                    name={name}
                    placeholder={name}
                    onChange={({target: {value}}) => setState((state => ({...state, [name]: value})))}
                />
                <Button disabled={buttonDisabled} variant={"outline-secondary"} type={"submit"}>Search</Button>
            </InputGroup>
        </Form>*/
    );
};

export default SearchPanel;