import java.util.Arrays;
import java.util.List;

public class Cidade {

    private String cidade;
    private Integer sinalizacao;

    public Cidade(Integer sinalizacao, String cidade) {
        this.sinalizacao = sinalizacao;
        this.cidade = cidade;
    }

    public String getCidade() {
        return cidade;
    }

    public Integer getSinalizacao() {
        return sinalizacao;
    }

    @Override
    public String toString() {
        return "Cidades{" +
                "cidade='" + cidade + '\'' +
                ", sinalizacao=" + sinalizacao +
                '}';
    }

    public static void selectionSort(List<Cidade> lista) {
        for (int i = 0; i < lista.size() - 1; i++) {
            int indMaior = i;
            for (int j = i + 1; j < lista.size(); j++) {
                if (lista.get(j).getSinalizacao() > lista.get(indMaior).getSinalizacao()) {
                    indMaior = j;
                }
            }

            Cidade aux = lista.get(i);
            lista.set(i, lista.get(indMaior));
            lista.set(indMaior, aux);
        }
    }

}
