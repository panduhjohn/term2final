import React from 'react'

const nav = () => {
    return (
        <nav className='navbar navbar-light bg-light'>
            <a className='navbar-brand'>$TODO$</a>
            <form className='form-inline'>
                <input type='text' placeholder='email'    className='form-control mr-sm-2'/>
                <input type='text' placeholder='password' className='form-control mr-sm-2'/>
                <button className='btn btn-outline-success my-2 my-sn-0'>Sign Up | Sign In</button>
            </form>
        </nav>
    )
}

export default nav