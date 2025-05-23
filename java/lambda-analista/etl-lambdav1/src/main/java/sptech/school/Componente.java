package sptech.school;

import com.opencsv.bean.CsvBindByName;

public class Componente {

    @CsvBindByName(column = "porcentagemDisco")
    private Double porcentagemDisco;

    @CsvBindByName(column = "porcentagemCpu")
    private Double porcentagemCpu;

    @CsvBindByName(column = "porcentagemRam")
    private Double porcentagemRam;

    @CsvBindByName(column = "lote")
    private String lote;

    private Integer criticoCpu = 0;

    private Integer moderadoCpu = 0;

    private Integer normalCpu = 0;

    private Integer criticoRam = 0;

    private Integer moderadoRam = 0;

    private Integer normalRam = 0;

    private Integer criticoDisco = 0;

    private Integer moderadoDisco = 0;

    private Integer normalDisco = 0;

    // Getters e setters
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

    public Double getPorcentagemRam() {
        return porcentagemRam;
    }

    public void setPorcentagemRam(Double porcentagemRam) {
        this.porcentagemRam = porcentagemRam;
    }

    public String getLote() {
        return lote;
    }

    public void setLote(String lote) {
        this.lote = lote;
    }

    public Integer getCriticoCpu() {
        return criticoCpu;
    }

    public void setCriticoCpu(Integer criticoCpu) {
        this.criticoCpu = criticoCpu;
    }

    public Integer getModeradoCpu() {
        return moderadoCpu;
    }

    public void setModeradoCpu(Integer moderadoCpu) {
        this.moderadoCpu = moderadoCpu;
    }

    public Integer getNormalCpu() {
        return normalCpu;
    }

    public void setNormalCpu(Integer normalCpu) {
        this.normalCpu = normalCpu;
    }

    public Integer getCriticoRam() {
        return criticoRam;
    }

    public void setCriticoRam(Integer criticoRam) {
        this.criticoRam = criticoRam;
    }

    public Integer getModeradoRam() {
        return moderadoRam;
    }

    public void setModeradoRam(Integer moderadoRam) {
        this.moderadoRam = moderadoRam;
    }

    public Integer getNormalRam() {
        return normalRam;
    }

    public void setNormalRam(Integer normalRam) {
        this.normalRam = normalRam;
    }

    public Integer getCriticoDisco() {
        return criticoDisco;
    }

    public void setCriticoDisco(Integer criticoDisco) {
        this.criticoDisco = criticoDisco;
    }

    public Integer getModeradoDisco() {
        return moderadoDisco;
    }

    public void setModeradoDisco(Integer moderadoDisco) {
        this.moderadoDisco = moderadoDisco;
    }

    public Integer getNormalDisco() {
        return normalDisco;
    }

    public void setNormalDisco(Integer normalDisco) {
        this.normalDisco = normalDisco;
    }

}