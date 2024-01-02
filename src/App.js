import logo from './logo.svg';
import './App.css';
import CrudManager from './Crud-Manager/CrudManager';

function App() {
  const schema = {
    "labels": ["url",
        "_id",
        "title",
        "details",
        "active",
        "status",
        "last_update",
        "company_id",
        "updated_by",
        "author"],
    "readBlock": [
        "_id",
        "last_update",
        "updated_by",
        "author",
        "url", 
        "company_id", 
        "active"
    ],
    "editBlock": [
        "_id",
        "last_update",
        "updated_by",
        "author", "url", "company_id"
    ],
    "createBlock": [
        "_id",
        "last_update",
        "updated_by",
        "author", "url", "company_id", "active"
    ]
}
  return (
    <div className="App">
      <CrudManager manage={true} data={schema} api="http://127.0.0.1:8001/api/v1/project/"  />
    </div>
  );
}

export default App;
