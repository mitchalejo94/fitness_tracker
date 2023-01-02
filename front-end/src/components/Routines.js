import react from "react";


const Routines = ({routines, token}) => {
    return (
        <>
        <h1 className="centered ui header">Routines</h1>
        {token ? <> <div className="ui card centered"><div className="content"><div className="header">CREATE ROUTINE</div><form class="ui form"><div class="field"><label>Routine Name</label><input placeholder="Routine Name"/></div><div class="field"><label>Routine Description</label><input placeholder="Activity Description"/></div><div class="field"></div><button class="ui button" type="submit">Create Routine</button></form></div> </div> </> : null}
        {routines.map((individualRoutine)=> {
            return( 
                <>
                
    
                <div className="ui card centered">
                
                    <div className="header">{individualRoutine.name.toUpperCase()}</div>
                    <div className="meta">{individualRoutine.goal}</div>
                
                    </div>
                </>
            )
        })}
        </>
    )
}



export default Routines;