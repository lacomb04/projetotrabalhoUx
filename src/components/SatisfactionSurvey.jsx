import React, { useState } from "react";
import styled from "styled-components";
import Card from "./ui/Card";
import Button from "./ui/Button";

const SurveyCard = styled(Card)`
  padding: var(--space-5);
  border-radius: 0;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border: none;
  box-shadow: none;
`;

const MetricSection = styled.div`
  margin-bottom: var(--space-4);
`;

const MetricTitle = styled.h4`
  margin: 0 0 var(--space-2) 0;
  font-size: 1rem;
  color: var(--text);
`;

const MetricDescription = styled.p`
  margin: 0 0 var(--space-3) 0;
  font-size: 0.875rem;
  color: var(--muted);
`;

const ScaleButtons = styled.div`
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
`;

const ScoreButton = styled.button`
  min-width: 48px;
  height: 48px;
  border-radius: 8px;
  border: 2px solid ${({ selected }) => (selected ? "#3b82f6" : "#e5e7eb")};
  background: ${({ selected }) => (selected ? "#3b82f6" : "#fff")};
  color: ${({ selected }) => (selected ? "#fff" : "#374151")};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #3b82f6;
    transform: translateY(-2px);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 80px;
  padding: var(--space-3);
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-family: inherit;
  font-size: 0.875rem;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

export default function SatisfactionSurvey({ onSubmit, onCancel }) {
  const [csat, setCsat] = useState(null); // 1-5
  const [ces, setCes] = useState(null); // 1-7
  const [nps, setNps] = useState(null); // 0-10
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (csat === null || ces === null || nps === null) {
      alert("Por favor, avalie todas as métricas antes de enviar.");
      return;
    }
    onSubmit({ csat, ces, nps, comment });
  };

  return (
    <SurveyCard>
      <h3 style={{ marginTop: 0 }}>Avalie sua experiência</h3>
      <p style={{ color: "var(--muted)", marginBottom: "var(--space-4)" }}>
        Sua opinião é muito importante para melhorarmos nosso atendimento.
      </p>

      <form onSubmit={handleSubmit}>
        {/* CSAT - Customer Satisfaction Score */}
        <MetricSection>
          <MetricTitle>📊 CSAT - Satisfação Geral</MetricTitle>
          <MetricDescription>
            Quão satisfeito você está com a resolução do seu chamado?
          </MetricDescription>
          <ScaleButtons>
            {[1, 2, 3, 4, 5].map((score) => (
              <ScoreButton
                key={score}
                type="button"
                selected={csat === score}
                onClick={() => setCsat(score)}
              >
                {score}
              </ScoreButton>
            ))}
          </ScaleButtons>
          <div style={{ marginTop: "var(--space-2)", fontSize: "0.75rem", color: "var(--muted)" }}>
            1 = Muito insatisfeito • 5 = Muito satisfeito
          </div>
        </MetricSection>

        {/* CES - Customer Effort Score */}
        <MetricSection>
          <MetricTitle>⚡ CES - Facilidade de Resolução</MetricTitle>
          <MetricDescription>
            Quanto esforço você precisou fazer para resolver seu problema?
          </MetricDescription>
          <ScaleButtons>
            {[1, 2, 3, 4, 5, 6, 7].map((score) => (
              <ScoreButton
                key={score}
                type="button"
                selected={ces === score}
                onClick={() => setCes(score)}
              >
                {score}
              </ScoreButton>
            ))}
          </ScaleButtons>
          <div style={{ marginTop: "var(--space-2)", fontSize: "0.75rem", color: "var(--muted)" }}>
            1 = Muito difícil • 7 = Muito fácil
          </div>
        </MetricSection>

        {/* NPS - Net Promoter Score */}
        <MetricSection>
          <MetricTitle>💬 NPS - Recomendação</MetricTitle>
          <MetricDescription>
            Qual a probabilidade de você recomendar nosso suporte?
          </MetricDescription>
          <ScaleButtons>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
              <ScoreButton
                key={score}
                type="button"
                selected={nps === score}
                onClick={() => setNps(score)}
              >
                {score}
              </ScoreButton>
            ))}
          </ScaleButtons>
          <div style={{ marginTop: "var(--space-2)", fontSize: "0.75rem", color: "var(--muted)" }}>
            0 = Não recomendaria • 10 = Recomendaria totalmente
          </div>
        </MetricSection>

        {/* Comentário opcional */}
        <MetricSection>
          <MetricTitle>💭 Comentário (opcional)</MetricTitle>
          <TextArea
            placeholder="Deixe um comentário sobre sua experiência..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </MetricSection>

        <div className="stack" style={{ gap: "var(--space-2)", marginTop: "var(--space-4)" }}>
          <Button type="submit" variant="primary">
            Enviar avaliação
          </Button>
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancelar
          </Button>
        </div>
      </form>
    </SurveyCard>
  );
}
