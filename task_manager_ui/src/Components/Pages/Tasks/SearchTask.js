import { Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setFilteredTasks } from "../../../Reducers/Tasks";

const SearchTask = () => {
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks.tasks);
    const searchTasks = (str) => {
        const filtered = tasks.filter((task)=>task.name.includes(str));
        dispatch(setFilteredTasks(filtered));
    }

    return <Input.Search placeholder="Search Tasks" onSearch={searchTasks} />
}

export default SearchTask;