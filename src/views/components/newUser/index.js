import "./newUser.css"
// import { Link } from "react-router-dom";

export default function NewUser() {
    return (
        <div  className="newUser">
            <h1 className="newUserTitle">Register</h1>
            <form className="newUserForm">
               
                <div className="newUserItem">
                    <label> Name in English</label>
                    <input type="text" placeholder="john smith"/>
                </div>
                <div className="newUserItem">
                    <label> Name in Arabic</label>
                    <input type="text" placeholder="john smith"/>
                </div>
               
                <div className="newUserItem">
                    <label>Nationality</label>
                    <select className="newUserSelect" name="active" ame="active">
                    <option value="Dubai">Dubai</option>
                    <option  value="India">India</option>
                        </select>
                </div>
                <div className="newUserItem">
                    <label>Id</label>
                    <select className="newUserSelect" name="active" ame="active">
                    <option value="Adhaara card">Adhaara card</option>
                    <option  value="Passport">Passport</option>
                        </select>
                </div>
                <div className="newUserItem">
                    <label> Residence</label>
                    <input type="text" placeholder="Washington DC"/>
                </div>
                <div className="newUserItem">
                    <label> Address</label>
                    <textarea cols="80" rows="5" value="address">  </textarea>
                </div>
                <div className="newUserItem">
                    <label> Email</label>
                    <input type="email" placeholder="john@123"/>
                </div>
                <div className="newUserItem">
                    <label> Phone</label>
                    <input type="text" placeholder="+91-7894561236"/>
                </div>
                
                <div className="newUserItem">
                    <label>Date of Birth</label>
                    <input type="date"/>
                </div>
                <div className="newUserItem">
                    <label>Upload the file </label>
                    <input type="file" placeholder="password"/>
                </div>
                <div className="newUserItem">
                    <label>License Type</label>
                    <select className="newUserSelect" name="active" ame="active">
                    <option value="Adhaara card">Adhaara card</option>
                    <option  value="Passport">Passport</option>
                        </select>
                </div>
                <div className="newUserItem">
                    <label>Gender</label>
                    <div className="newUserGender">
                    <input type="radio" name="gender" id="male" value="male" />
                    <label for="male">Male</label>
                    <input type="radio" name="gender" id="female" value="female" />
                    <label for="female">Female</label>
                    <input type="radio" name="gender" id="other" value="other" />
                    <label for="other">Other</label>
                    </div>
                </div>
          
                <button className="newUserButton">Register</button>
            </form>
        </div>
    )
}
