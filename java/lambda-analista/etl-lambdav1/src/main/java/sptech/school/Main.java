package sptech.school;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.S3Event;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;

import java.io.*;
import java.util.List;

public class Main implements RequestHandler<S3Event, String> {

    private final AmazonS3 s3Client = AmazonS3ClientBuilder.defaultClient();
    private static final String DESTINATION_BUCKET = "client-allset";

    @Override
    public String handleRequest(S3Event s3Event, Context context) {

        String sourceBucket = s3Event.getRecords().get(0).getS3().getBucket().getName();
        String sourceKey = s3Event.getRecords().get(0).getS3().getObject().getKey();

        try {
            // Lê o arquivo CSV do bucket de origem
            InputStream s3InputStream = s3Client.getObject(sourceBucket, sourceKey).getObjectContent();
            Reader reader = new InputStreamReader(s3InputStream);

            // Converte CSV em lista de componentes
            CsvToBean<Componente> csvToBean = new CsvToBeanBuilder<Componente>(reader)
                    .withType(Componente.class)
                    .withIgnoreLeadingWhiteSpace(true)
                    .build();

            List<Componente> componentes = csvToBean.parse();

            // Classifica os componentes em categorias
            for (Componente c : componentes) {
                if (c.getPorcentagemCpu() <= 50) {
                    c.setNormalCpu(c.getNormalCpu() + 1);
                } else if (c.getPorcentagemCpu() <= 90) {
                    c.setModeradoCpu(c.getModeradoCpu() + 1);
                } else {
                    c.setCriticoCpu(c.getCriticoCpu() + 1);
                }

                if (c.getPorcentagemRam() <= 70) {
                    c.setNormalRam(c.getNormalRam() + 1);
                } else if (c.getPorcentagemRam() <= 90) {
                    c.setModeradoRam(c.getModeradoRam() + 1);
                } else {
                    c.setCriticoRam(c.getCriticoRam() + 1);
                }

                if (c.getPorcentagemDisco() <= 50) {
                    c.setNormalDisco(c.getNormalDisco() + 1);
                } else if (c.getPorcentagemDisco() <= 80) {
                    c.setModeradoDisco(c.getModeradoDisco() + 1);
                } else {
                    c.setCriticoDisco(c.getCriticoDisco() + 1);
                }
            }

            // Calcula os totais
            TotaisComponentes totais = calcularTotais(componentes);

            // Escreve novo CSV com os totais
            CsvWriter csvWriter = new CsvWriter();
            ByteArrayOutputStream csvOutputStream = csvWriter.writeCsv(totais);
            InputStream csvInputStream = new ByteArrayInputStream(csvOutputStream.toByteArray());

            // Salva o novo CSV no bucket de destino
            String newKey = sourceKey.replace(".csv", "_resumo.csv");
            s3Client.putObject(DESTINATION_BUCKET, newKey, csvInputStream, null);

            return "Processamento concluído com sucesso";
        } catch (Exception e) {
            context.getLogger().log("Erro: " + e.getMessage());
            return "Erro no processamento";
        }
    }

    public static TotaisComponentes calcularTotais(List<Componente> componentes) {
        TotaisComponentes totais = new TotaisComponentes();

        for (Componente c : componentes) {
            totais.normalCpu += c.getNormalCpu();
            totais.moderadoCpu += c.getModeradoCpu();
            totais.criticoCpu += c.getCriticoCpu();

            totais.normalRam += c.getNormalRam();
            totais.moderadoRam += c.getModeradoRam();
            totais.criticoRam += c.getCriticoRam();

            totais.normalDisco += c.getNormalDisco();
            totais.moderadoDisco += c.getModeradoDisco();
            totais.criticoDisco += c.getCriticoDisco();
        }

        return totais;
    }
}
