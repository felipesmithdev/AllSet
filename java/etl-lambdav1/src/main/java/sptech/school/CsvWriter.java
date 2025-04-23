package sptech.school;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;

import java.io.BufferedWriter;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.nio.charset.StandardCharsets;
import java.util.List;

public class CsvWriter {

    public ByteArrayOutputStream writeCsv(List<Componente> componentes) throws IOException {
        // Criar um CSV em memória utilizando ByteArrayOutputStream
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(outputStream, StandardCharsets.UTF_8));
        CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT.withHeader("discoUso", "porcentagemDisco", "porcentagemCpu", "ramUso", "porcentagemRam", "porcentagemBateria", "hrCaptura"));

        // Processar e escrever cada objeto no CSV
        for (Componente componente : componentes) {
            csvPrinter.printRecord(
                    componente.getDiscoUso(),
                    componente.getPorcentagemDisco(),
                    componente.getPorcentagemCpu(),
                    componente.getRamUso(),
                    componente.getPorcentagemRam(),
                    componente.getPorcentagemBateria(),
                    componente.getHrCaptura()
            );
        }

        // Fechar o CSV para garantir que todos os dados sejam escritos
        csvPrinter.flush();
        writer.close();

        // Retornar o ByteArrayOutputStream que contém o CSV gerado
        return outputStream;
    }
}
