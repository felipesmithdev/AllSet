library(readr)
library(ggplot2)

teste_regressao <- read_csv("CAMINHO DO ARQUIVO")
teste_regressao1 <- read_csv("CAMINHO DO ARQUIVO")

View(teste_regressao)
View(teste_regressao1)

dt_captura <- teste_regressao1$hrCaptura
teste_regressao$hr_captura <- dt_captura

set.seed(1234)
situacao <- sample(c('normal', 'chuvoso', 'tempestade'), size = nrow(teste_regressao), replace = TRUE, prob = c(0.6,0.3,0.1))

discoUso <- ifelse(situacao == 'normal', sample(seq(100, 200, by = 1), size = nrow(teste_regressao), replace = TRUE),
                   ifelse(
                     situacao == 'chuvoso', sample(seq(300, 400, by = 1), size = nrow(teste_regressao), replace = TRUE),
                     sample(seq(500, 600, by = 1), size = nrow(teste_regressao), replace = TRUE)
                    )
                  )

teste_regressao$situacao <- situacao
teste_regressao$discoUso <- discoUso
teste_regressao

cpuUso <- ifelse(situacao == 'normal', sample(seq(10, 30, by = 1), size = nrow(teste_regressao), replace = TRUE),
                 ifelse(situacao == 'chuvoso', sample(seq(40, 60, by = 1), size = nrow(teste_regressao), replace = TRUE),
                        sample(seq(70, 90, by = 1), size = nrow(teste_regressao), replace = TRUE)
                        )
                 )

ramUso <- ifelse(situacao == 'normal', sample(seq(4, 8, by = 1), size = nrow(teste_regressao), replace = TRUE),
                 ifelse(situacao == 'chuvoso', sample(seq(9, 13, by = 1), size = nrow(teste_regressao), replace = TRUE),
                        sample(seq(14, 18, by = 1), size = nrow(teste_regressao), replace = TRUE)
                        )
                 )


teste_regressao$ramUso <- ramUso
teste_regressao$porcentagemCpu <- cpuUso


data <- sample(seq(as.Date("2025-01-01"), as.Date("2025-04-26"), by = 'day'), size = nrow(teste_regressao), replace = TRUE)
data

teste_regressao$hr_captura <- data


ggplot(teste_regressao, aes(x = situacao, fill = situacao)) +
  geom_bar() +
  labs(title = "Distribuição Climática", x = "Clima", y = "Contagem") +
  theme_minimal()

table(situacao)

# correlação geral, ficou disperso devido aos climas serem diferentes,
# como podem ver, houve uma concentração no início, o que nos leva a saber se
# está chovendo ou não apenas com esse gráfico
plot(teste_regressao$ramUso ~ teste_regressao$porcentagemCpu)
modelo1 <- lm(teste_regressao$ramUso ~ teste_regressao$porcentagemCpu)
modelo1
abline(2.4118, 0.1725)

# agora vou filtrar por periodo chuvoso e buscar uma possivel comparacao de valores
simuRam <- as.numeric(ifelse(teste_regressao$situacao == 'chuvoso', teste_regressao$ramUso, NA))
simuRam <- na.omit(simuRam)

simuCpu <- as.numeric(ifelse(teste_regressao$situacao == 'chuvoso', teste_regressao$porcentagemCpu, NA))
simuCpu <- na.omit(simuCpu)
simuCpu

# periodo normal

normRam <- as.numeric(ifelse(teste_regressao$situacao == 'normal', teste_regressao$ramUso, NA))
normRam <- na.omit(normRam)

normCpu <- as.numeric(ifelse(teste_regressao$situacao == 'normal', teste_regressao$porcentagemCpu, NA))
normCpu <- na.omit(normCpu)

# periodo tempestade

tempestRam <- as.numeric(ifelse(teste_regressao$situacao == 'tempestade', teste_regressao$ramUso, NA))
tempestRam <- na.omit(tempestRam)

tempestCpu <- as.numeric(ifelse(teste_regressao$situacao == 'tempestade', teste_regressao$porcentagemCpu, NA))
tempestCpu <- na.omit(tempestCpu)

# comparacao entre eles

mediaCpu <- c(mean(normCpu), mean(simuCpu), mean(tempestCpu))
mediaRam <- c(mean(normRam), mean(simuRam), mean(tempestRam))

periodo <- c('normal', 'chuvoso', 'tempestade')

comparar <- data.frame(periodo, mediaCpu, mediaRam)


# comparar cpu com periodo
ggplot(comparar, aes(x = periodo, y = mediaCpu, fill = periodo)) +
  geom_bar(stat = 'identity') +
  labs(title = 'Média da cpu por período', x = 'Período', y = 'Média CPU') +
  theme_minimal() 

mediaCpu
# ou seja, chegamos a conclusão que períodos de chuva ou tempestade tendem a causar estresse na
# cpu entre os carros autônomos


# comparar ram com periodo
ggplot(comparar, aes(x = periodo, y = mediaRam, fill = periodo)) +
  geom_bar(stat = 'identity') +
  labs(title = "Média da ram por período", x = 'Período', y = 'Média RAM(GB)') +
  theme_minimal()

mediaRam

# Chegamos a conclusão que periodos de chuva ou tempestade tendem a causar estresse na RAM
# entre os carros autônomos


# Esses são pequenos exemplos de como nossos insights serão gerados, ao receber o arquivo tratado, o analista tende a 
# utilizar métodos matemáticos e funções para identificar oportunidades.

