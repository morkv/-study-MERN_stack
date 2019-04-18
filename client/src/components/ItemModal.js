import React,{ Component } from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import uuid from 'uuid';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import { addItem } from '../actions/itemActions';

class ItemModal extends Component {
    state = {
        modal: false,
        name: ''
    }

    // Toggle modal
    toggle = () => {
        this.setState({
            modal: !this.state.modal,
            name: ''
        })
    }

    //OnSubmit
    onSubmit = e => {
        e.preventDefault();

        const newItem = {
            id: uuid(),
            name: this.state.name
        };

        //Add Item via addItem action
        this.props.addItem(newItem);

        //Close Modal
        this.toggle();

    }

    //OnChange item
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        return (
            <div>
                <Button
                    color="dark"
                    style={{marginBottom: '2rem'}}
                    onClick={this.toggle}
                >
                    Add Item
                </Button>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>
                        Add To Shopping List
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="item">Item: {this.state.name}</Label>
                                <Input 
                                    type="text"
                                    name="name"
                                    id="item"
                                    placeholder="Add shopping item"
                                    onChange={this.onChange}/>
                            </FormGroup>
                            <Button
                                color="dark"
                                style={{marginTop: '2rem'}}
                                block
                            >
                                Add Item
                            </Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    item: state.item
});

ItemModal.propTypes = {
    addItem: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { addItem })(ItemModal);