import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Categoria extends Component {

    constructor(props){
        super(props);
        this.state = {
            redirect: false
        }
        this.setRedirect = this.setRedirect.bind(this);
    }

    setRedirect(){
        this.setState({redirect: !this.state.redirect});
    }

    redirectCategoria(url){
        if(this.state.redirect){
            return <Link component={() => {window.location.href = url; return null;}}/>
        }
    }

    render() {
        return (
            <div>
                <Link onClick={this.setRedirect} class="list-group-item">{this.props.categoria}</Link>
                {this.redirectCategoria("/empresa/" + this.props.empresa._id + "/" + this.props.categoria)}
            </div>
        );
    }
}

export default Categoria;