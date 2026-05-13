import { useRecoilState } from "recoil";
import { tarefasState } from "./state/tarefasAtom";
import { useState } from "react";

function Tarefas() {
  const [texto, setTexto] = useState("");
  const [filtro, setFiltro] = useState("todas");

  const [tarefas, setTarefas] = useRecoilState(tarefasState);

  const tarefasFiltradas = tarefas.filter((tarefa) => {
    if (filtro === "concluidas") return tarefa.concluida;
    if (filtro === "pendentes") return !tarefa.concluida;

    return true;
  });

  return (
    <div>
      <h1>Lista de tarefas</h1>

      <button onClick={() => setFiltro("todas")}>
        Todas
      </button>

      <button onClick={() => setFiltro("concluidas")}>
        Concluídas
      </button>

      <button onClick={() => setFiltro("pendentes")}>
        Pendentes
      </button>

      {tarefasFiltradas.map((tarefa) => (
        <li key={tarefa.id}>
          {tarefa.texto}

          <button
            onClick={() => {
              setTarefas((antigo) =>
                antigo.map((item) =>
                  item.id === tarefa.id
                    ? {
                        ...item,
                        concluida: !item.concluida,
                      }
                    : item
                )
              );
            }}
          >
            {tarefa.concluida ? "Desfazer" : "Concluir"}
          </button>

          <button
            onClick={() => {
              setTarefas((antigo) =>
                antigo.filter(
                  (item) => item.id !== tarefa.id
                )
              );
            }}
          >
            Remover
          </button>
        </li>
      ))}

      <input
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Digite a tarefa"
      />

      <button
        onClick={() => {
          if (!texto.trim()) return;

          setTarefas((antigo) => [
            ...antigo,
            {
              id: Date.now(),
              texto: texto,
              concluida: false,
            },
          ]);

          setTexto("");
        }}
      >
        Adicionar
      </button>
    </div>
  );
}

export default Tarefas;