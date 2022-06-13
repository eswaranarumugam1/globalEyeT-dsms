import "./newProduct.css"

export default function NewProduct() {
    return (
        <div  className="newUser">
        <h1 className="newUserTitle">Register</h1>
        <form className="newUserForm">
           
            <div className="newUserItem">
                <label> Name</label>
                <input type="text" placeholder="john smith"/>
            </div>
            <div className="newUserItem">
                <label> Position</label>
                <input type="text" placeholder="john smith"/>
            </div>
               
            <div className="newUserItem">
                <label>-Date of enrolment</label>
                <input type="date"/>
            </div>
           
            <div className="newUserItem">
                <label>Nationality</label>
                <select className="newUserSelect" name="active" ame="active">
                <option value="Dubai">Dubai</option>
                <option  value="India">India</option>
                    </select>
            </div>
            <div className="newUserItem">
                <label>Age</label>
                <input type="text" placeholder="john smith"/>
            </div>
            <div className="newUserItem">
                <label>Certifications </label>
                <select className="newUserSelect" name="active" ame="active">
                <option value="1">1</option>
                <option  value="2">2</option>
                    </select>
            </div>
            <div className="newUserItem">
                <label>Type </label>
                <select className="newUserSelect" name="active" ame="active">
                <option value="1">1</option>
                <option  value="2">2</option>
                    </select>
            </div>
            <div className="newUserItem">
                <label>Specialty </label>
                <select className="newUserSelect" name="active" ame="active">
                <option value="1">1</option>
                <option  value="2">2</option>
                    </select>
            </div>
            <div className="newUserItem">
                <label>Extra hours </label>
                <select className="newUserSelect" name="active" ame="active">
                <option value="1">1</option>
                <option  value="2">2</option>
                    </select>
            </div>
           
            <div className="newUserItem">
                <label>-Home address</label>
                <textarea cols="80" rows="5" value="address">  </textarea>
            </div>
          
            <div className="newUserItem">
                <label> Phone</label>
                <input type="text" placeholder="+91-7894561236"/>
            </div>
            
            
            <div className="newUserItem">
                <label>Can give</label>
                <select className="newUserSelect" name="active" ame="active">
                <option value="only men">only men</option>
                <option  value="only women">only women</option>
                <option  value="other">other</option>
                    </select>
            </div>
          
      
            <button className="newUserButton">Register</button>
        </form>
    </div>
    )
}
