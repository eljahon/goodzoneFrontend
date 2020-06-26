import { Component } from "react";

export default class Service extends Component {
    state = {
        data: [],
    };
    componentDidMount() {
        fetch("/api/products")
            .then((res) => res.json())
            .then((data) => {
                this.setState({ data });
                console.log(data);
            });
    }
    render() {
        const { data } = this.state;
        return (
            <ul>
                {data.map((item) => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        );
    }
}
