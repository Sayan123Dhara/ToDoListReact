import React,{useState} from "react";
// import Todo from "./Todo";
import todolist from "./to-do-list.png";

const Todolist = () => {
	const[Input,SetInput] = useState('');
	const [Items,SetItems] = useState([]);
	const [toggleButton,SettoggleButton] = useState(true);
	const [IseditItems, SetIseditItems] = useState(null);
	const [rightItem, setrightItem] = useState([]);
	const [crossItem,setcrossItem] = useState([]);

	const dataChange = (e) => {
		return SetInput(e.target.value);
	};

	const listClick = () => { 
		if(!Input){
			alert("EMPTY DATA NOT ACCEPTED!!!");
		}
		else if (Input && !toggleButton){
			SetItems(
				Items.map((elem) => {
					if(elem.id === IseditItems){
						return {...elem, name: Input}
					}
					return elem;
				})
			)
			SettoggleButton(true);
			SetInput('');

			SetIseditItems(null);
		}
		else{
			const AllInputData = {id: new Date().getTime().toString(), name:Input}
			SetItems( [...Items,AllInputData] );
			SetInput("");
			// console.log(Items);
		}
	};
	const deleteItems = (index) => {

		const UpdatedItems = Items.filter((elem) => {
			return (index !== elem.id) ;
		});
			SetItems(UpdatedItems);
	}

	const editItems = (id) => {
		let newEditItem = Items.find((elem) => {
			return (elem.id === id);
		})
		SettoggleButton(false);
		SetInput(newEditItem.name);
		SetIseditItems(id);
	}



	const notDoneItem = (index) => {
		setcrossItem([...crossItem, index]);
		console.log(crossItem);
}


	const doneItem = (index) => {
		const UpdatedItems = crossItem.filter((elem) => {
			return (index !== elem) ;
		});
			setcrossItem(UpdatedItems);
			setrightItem([...rightItem, index]);
			console.log(rightItem);

	}

	const RemoveAll = () => {
		SetItems([]);
	}

    

	return (
		<>
			<div className="Main_div">
				<div className ="inner_div">
					<br />
					<h1>ToDo List</h1>
					<br />
					<input type="text" placeholder="Add a items" autoComplete="off" value={Input} onChange={dataChange} />

						{toggleButton ? 

					<button onClick={listClick} data-toggle="tooltip" data-placement="right" title="Add Items"><i className="fa fa-plus" aria-hidden="true"></i></button>

					: <button onClick={listClick} data-toggle="tooltip" data-placement="right" title="Update Items"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>}

					<div className="another_div">
						<ol>
						{
							Items.map((elem) => {
							return(
									<div className="todo_style" key={elem.id} >

										<i className="fa fa-trash" aria-hidden="true" onClick= { () => { deleteItems(elem.id) }}	data-toggle="tooltip" data-placement="left" title="Delete Item"  />

										<span onClick= { () => notDoneItem(elem.id) }>
											<i class="fa fa-times" aria-hidden="true" data-toggle="tooltip" data-placement="left" title="Not Done Item" />
										</span>

										<span onClick= { () => doneItem(elem.id) }>
											<i class="fa fa-check" aria-hidden="true" data-toggle="tooltip" data-placement="left" title="Done Item"  />
										</span>

										<i className="fa fa-pencil-square-o" aria-hidden="true" onClick= { () => { editItems(elem.id) }} data-toggle="tooltip" data-placement="left" title="Edit Item" />

										<li className = { crossItem.includes(elem.id) ? "wrong" : rightItem.includes(elem.id) ? "rightelement" : "none" } >{elem.name}</li>

										
									</div>
								)
							})
						}

						</ol>
					</div>
					<div className="showItmes">
						<button className="btn effect04" onClick={RemoveAll}><span>Remove All</span></button>
					</div>
				</div>
			</div>
		</>
		);
}

export default Todolist;


{/*<i class="fa fa-trash" aria-hidden="true"></i>*/}
// <i class="fa fa-check" aria-hidden="true"></i>
{/*<i class="fa fa-pencil-square-o" aria-hidden="true"></i>*/}
