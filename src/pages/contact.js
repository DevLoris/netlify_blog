import React from "react"
import {getFirebase} from "../components/firebase";
import Layout from "../components/layout";
import SEO from "../components/seo";

export default class ContactPage extends React.Component {
    state = {
        firstName: "",
        lastName: "",
    }

    handleInputChange = event => {
        const target = event.target
        const value = target.value
        const name = target.name

        this.setState({
            [name]: value,
        })
    }

    handleSubmit = event => {
        event.preventDefault()
        alert(`Welcome ${this.state.firstName} ${this.state.lastName}!`)
        const firebase = require("firebase/firebase");

            const database = getFirebase(firebase).database()
            database.ref('emails').push().set( {firstName: this.state.firstName, lastName: this.state.lastName}  );

    }

    render() {

        return (
            <Layout location={this.props.location} title="Contact">
                <SEO title="Contact" />
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            First name
                            <input
                                type="text"
                                name="firstName"
                                value={this.state.firstName}
                                onChange={this.handleInputChange}
                            />
                        </label>
                        <br />
                        <label>
                            Last name
                            <input
                                type="text"
                                name="lastName"
                                value={this.state.lastName}
                                onChange={this.handleInputChange}
                            />
                        </label>
                            <br />
                        <button type="submit">Submit</button>
                    </form>
            </Layout>
        )
    }
}