package sptech.school;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;

import java.io.*;
import java.nio.charset.StandardCharsets;

public class CsvWriter {
    public ByteArrayOutputStream writeCsv(TotaisComponentes totais) throws IOException {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(outputStream, StandardCharsets.UTF_8));

        CSVFormat format = CSVFormat.DEFAULT
                .withDelimiter(';')
                .withHeader("componente", "critico", "moderado", "normal");

        CSVPrinter csvPrinter = new CSVPrinter(writer, format);

        csvPrinter.printRecord("cpu", totais.criticoCpu, totais.moderadoCpu, totais.normalCpu);
        csvPrinter.printRecord("ram", totais.criticoRam, totais.moderadoRam, totais.normalRam);
        csvPrinter.printRecord("disco", totais.criticoDisco, totais.moderadoDisco, totais.normalDisco);

        csvPrinter.flush();
        writer.flush();

        return outputStream;
    }

}