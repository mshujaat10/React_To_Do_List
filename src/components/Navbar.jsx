function Navbar() {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid d-flex justify-content-center align-items-center">
                    <span className="material-symbols-outlined">
                        task_alt
                    </span>
                    <a className="navbar-brand text-light" href="#">ToDo List</a>
                </div>
            </nav>
        </>
    )
}

export default Navbar;