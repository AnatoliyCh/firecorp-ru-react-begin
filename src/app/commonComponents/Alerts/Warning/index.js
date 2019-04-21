import React from 'react';

const AlertWarning = (props) => {
    return (
        <div className="alert alert-warning alert-dismissible fade show" role="alert"> {props}
            {/*<button type="button" className="close" data-dismiss="alert" aria-label="Close">*/}
                {/*<span aria-hidden="true">&times;</span>*/}
            {/*</button>*/}
        </div>
    )
};

export default AlertWarning

