import React, { Component, Fragment } from 'react';
export class  LoginForm extends Component {


    render(){
        return (
            <Fragment>
                <div className="container">
                    <div className="row justify-content-center ">
                        <form className="col-md-5 border border-light p-5">
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Email address</label>
                                <input type="login" className="form-control" id="exampleInputEmail1"
                                       aria-describedby="emailHelp" placeholder="Enter email" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1"
                                       placeholder="Password" />
                            </div>
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                            </div>
                            <button type="submit" className="btn btn-outline-primary">Submit</button>
                        </form>

                    </div>
                </div>
                <div id="container" className="container">
                    <div className="row">
                        <div className="col-sm-6 offset-sm-3 text-center card card-body px-lg-5">
                            <h1 className="display-4">Bootstrap 4</h1>
                            <div className="info-form">
                                <form action="" className="form-inlin justify-content-center">
                                    <div className="form-group">
                                        <label className="sr-only">Name</label>
                                        <input type="login" className="form-control" placeholder="Jane Doe" />
                                    </div>
                                    <div className="form-group">
                                        <label className="sr-only">Email</label>
                                        <input type="password" className="form-control"
                                               placeholder="jane.doe@example.com" />
                                    </div>
                                    <button type="submit" className="btn btn-success ">okay, go!</button>
                                </form>
                            </div>
                            <br />
                            <a href="#nav-main" className="btn btn-outline-secondary btn-sm" role="button"> More </a>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}