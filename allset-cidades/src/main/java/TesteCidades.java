import com.github.javafaker.Faker;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

public class TesteCidades {

    public static void main(String[] args) {

        Faker faker = new Faker(Locale.forLanguageTag("pt-br"));

        List<Cidade> cidades = new ArrayList<>();

        for (int i = 0; i <= 20; i++) {
            cidades.add(new Cidade(faker.random().nextInt(68 , 100), faker.address().city()));
        }


        Cidade.selectionSort(cidades);

        System.out.println("Cidades brasileiras mais propícias a receber veículos autônomos");

        System.out.printf("\n%-35S %16S", "Cidade", "Sinalização (%)");

        for (int i = 0; i < cidades.size(); i++) {
            System.out.printf("\n%-35s %16d", cidades.get(i).getCidade(), cidades.get(i).getSinalizacao());
        }




    }
}
