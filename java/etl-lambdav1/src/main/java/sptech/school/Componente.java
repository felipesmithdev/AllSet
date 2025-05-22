package sptech.school;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Componente {

    @JsonProperty("discoUso")
    private Double discoUso;

    @JsonProperty("porcentagemDisco")
    private Double porcentagemDisco;

    @JsonProperty("porcentagemCpu")
    private Double porcentagemCpu;

    @JsonProperty("ramUso")
    private Double ramUso;

    @JsonProperty("porcentagemRam")
    private Double porcentagemRam;

    @JsonProperty("porcentagemBateria")
    private Double porcentagemBateria;

    @JsonProperty("hrCaptura")
    private String hrCaptura;

    @JsonProperty("lote")
    private String lote;

    // Getters e setters

    public Double getDiscoUso() {
        return Math.round((discoUso / Math.pow(1024, 3)) * 100.0) / 100.0;
    }

    public void setDiscoUso(Double discoUso) {
        this.discoUso = discoUso;
    }

    public Double getPorcentagemDisco() {
        return porcentagemDisco;
    }

    public void setPorcentagemDisco(Double porcentagemDisco) {
        this.porcentagemDisco = porcentagemDisco;
    }

    public Double getPorcentagemCpu() {
        return porcentagemCpu;
    }

    public void setPorcentagemCpu(Double porcentagemCpu) {
        this.porcentagemCpu = porcentagemCpu;
    }

    public Double getRamUso() {
        return Math.round((ramUso / Math.pow(1024, 2)) * 100.0) / 100.0;
    }

    public void setRamUso(Double ramUso) {
        this.ramUso = ramUso;
    }

    public Double getPorcentagemRam() {
        return porcentagemRam;
    }

    public void setPorcentagemRam(Double porcentagemRam) {
        this.porcentagemRam = porcentagemRam;
    }

    public Double getPorcentagemBateria() {
        return porcentagemBateria;
    }

    public void setPorcentagemBateria(Double porcentagemBateria) {
        this.porcentagemBateria = porcentagemBateria;
    }

    public String getHrCaptura() {
        return hrCaptura;
    }

    public void setHrCaptura(String hrCaptura) {
        this.hrCaptura = hrCaptura;
    }

    public String getLote() {
        return lote;
    }

    public void setLote(String lote) {
        this.lote = lote;
    }
}