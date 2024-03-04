import {useLoaderData, useLocation, useNavigate, useParams} from "react-router-dom";

const ProfileModalView = () => {

    const prf = useLoaderData() as Partial<IUser>;
    let {id} = useParams<"id">();
    const navigate = useNavigate();
    return (
        <div className="modal fade show" style={{display: "block"}} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
             aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        MODAL VIEW id: { id } login: {prf.login}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={()=>navigate(-1)}>Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileModalView;