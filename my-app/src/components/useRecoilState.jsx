import { useTarefas } from "../context/TarefasContext";
import ItemTarefa from "./useRecoilValue";

export default function ListaTarefas() {
  const { tarefasFiltradas } = useTarefas();

  return (
    <ul>
      {tarefasFiltradas.map((item) => (
        <ItemTarefa key={item.id} item={item} />
      ))}
    </ul>
  );
}