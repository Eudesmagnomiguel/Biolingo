import pandas as pd
import numpy as np
import json
from pathlib import Path
from collections import Counter
import os

def analyze_species_distribution(species_df, recordings_df):
    """Analisa a distribuição de espécies nas gravações"""
    print("\n" + "="*60)
    print("ANÁLISE DE DISTRIBUIÇÃO DE ESPÉCIES")
    print("="*60)
    
    species_counts = recordings_df['species_id'].value_counts().sort_values(ascending=False)
    
    print(f"\nTotal de espécies: {len(species_counts)}")
    print(f"Espécies com gravações: {len(species_counts)}")
    print(f"Espécies sem gravações: {len(species_df) - len(species_counts)}")
    
    print("\nTop 10 espécies mais gravadas:")
    for idx, (species_id, count) in enumerate(species_counts.head(10).items(), 1):
        species_name = species_df[species_df['id'] == species_id]['common_name_en'].values[0]
        percentage = (count / len(recordings_df)) * 100
        print(f"  {idx}. {species_name}: {count} gravações ({percentage:.1f}%)")
    
    # Análise de desbalanceamento
    max_count = species_counts.max()
    min_count = species_counts.min()
    imbalance_ratio = max_count / min_count
    
    print(f"\nDesbalanceamento de classes:")
    print(f"  Máximo: {max_count}")
    print(f"  Mínimo: {min_count}")
    print(f"  Razão: {imbalance_ratio:.2f}:1")
    
    if imbalance_ratio > 3:
        print("  ⚠️  Dataset é significativamente desbalanceado!")
    else:
        print("  ✓ Dataset está bem balanceado")

def analyze_geographic_distribution(recordings_df):
    """Analisa a distribuição geográfica das gravações"""
    print("\n" + "="*60)
    print("ANÁLISE DE DISTRIBUIÇÃO GEOGRÁFICA")
    print("="*60)
    
    locations = recordings_df['location'].value_counts()
    
    print(f"\nTotal de localizações: {len(locations)}")
    print(f"Gravações por localização:")
    for location, count in locations.items():
        percentage = (count / len(recordings_df)) * 100
        print(f"  {location}: {count} gravações ({percentage:.1f}%)")
    
    # Estatísticas de coordenadas
    print(f"\nEstatísticas de coordenadas:")
    print(f"  Latitude - Min: {recordings_df['latitude'].min():.4f}, "
          f"Max: {recordings_df['latitude'].max():.4f}, "
          f"Mean: {recordings_df['latitude'].mean():.4f}")
    print(f"  Longitude - Min: {recordings_df['longitude'].min():.4f}, "
          f"Max: {recordings_df['longitude'].max():.4f}, "
          f"Mean: {recordings_df['longitude'].mean():.4f}")

def analyze_habitat_distribution(recordings_df):
    """Analisa a distribuição de habitats"""
    print("\n" + "="*60)
    print("ANÁLISE DE DISTRIBUIÇÃO DE HABITATS")
    print("="*60)
    
    habitats = recordings_df['habitat'].value_counts()
    
    print(f"\nTotal de habitats: {len(habitats)}")
    print(f"Gravações por habitat:")
    for habitat, count in habitats.items():
        percentage = (count / len(recordings_df)) * 100
        print(f"  {habitat}: {count} gravações ({percentage:.1f}%)")

def analyze_quality_distribution(recordings_df):
    """Analisa a distribuição de qualidade"""
    print("\n" + "="*60)
    print("ANÁLISE DE QUALIDADE DE GRAVAÇÕES")
    print("="*60)
    
    quality = recordings_df['quality'].value_counts()
    quality_order = ['poor', 'fair', 'good', 'excellent']
    
    print(f"\nDistribuição de qualidade:")
    for q in quality_order:
        if q in quality.index:
            count = quality[q]
            percentage = (count / len(recordings_df)) * 100
            print(f"  {q.upper()}: {count} gravações ({percentage:.1f}%)")

def analyze_classification_results(results_df, species_df):
    """Analisa os resultados de classificação"""
    print("\n" + "="*60)
    print("ANÁLISE DE RESULTADOS DE CLASSIFICAÇÃO")
    print("="*60)
    
    print(f"\nTotal de classificações: {len(results_df)}")
    
    # Confiança média
    mean_confidence = results_df['combined_confidence'].mean()
    std_confidence = results_df['combined_confidence'].std()
    
    print(f"\nConfiança combinada:")
    print(f"  Média: {mean_confidence:.4f}")
    print(f"  Desvio padrão: {std_confidence:.4f}")
    print(f"  Mínimo: {results_df['combined_confidence'].min():.4f}")
    print(f"  Máximo: {results_df['combined_confidence'].max():.4f}")
    
    # Distribuição de confiança
    print(f"\nDistribuição de confiança:")
    confidence_ranges = [
        (0.0, 0.5, "0.0 - 0.5"),
        (0.5, 0.7, "0.5 - 0.7"),
        (0.7, 0.85, "0.7 - 0.85"),
        (0.85, 1.0, "0.85 - 1.0"),
    ]
    
    for min_conf, max_conf, label in confidence_ranges:
        count = len(results_df[(results_df['combined_confidence'] >= min_conf) & 
                              (results_df['combined_confidence'] < max_conf)])
        percentage = (count / len(results_df)) * 100
        print(f"  {label}: {count} ({percentage:.1f}%)")
    
    # Tempo de processamento
    print(f"\nTempo de processamento (ms):")
    print(f"  Média: {results_df['processing_time'].mean():.0f}")
    print(f"  Mediana: {results_df['processing_time'].median():.0f}")
    print(f"  Máximo: {results_df['processing_time'].max():.0f}")

def analyze_observations(observations_df):
    """Analisa as observações de utilizadores"""
    print("\n" + "="*60)
    print("ANÁLISE DE OBSERVAÇÕES DE UTILIZADORES")
    print("="*60)
    
    print(f"\nTotal de observações: {len(observations_df)}")
    
    # Acurácia
    correct = len(observations_df[observations_df['is_correct'] == True])
    accuracy = (correct / len(observations_df)) * 100
    
    print(f"\nValidação de classificações:")
    print(f"  Corretas: {correct} ({accuracy:.1f}%)")
    print(f"  Incorretas: {len(observations_df) - correct} ({100 - accuracy:.1f}%)")
    
    # Confiança de rating
    print(f"\nDistribuição de confiança de rating:")
    ratings = observations_df['confidence_rating'].value_counts().sort_index()
    for rating, count in ratings.items():
        percentage = (count / len(observations_df)) * 100
        print(f"  Rating {rating}: {count} ({percentage:.1f}%)")

def analyze_ml_training_data(training_df, species_df):
    """Analisa os dados de treinamento de ML"""
    print("\n" + "="*60)
    print("ANÁLISE DE DADOS DE TREINAMENTO DE ML")
    print("="*60)
    
    print(f"\nTotal de amostras: {len(training_df)}")
    
    # Distribuição de espécies
    species_dist = training_df['species_id'].value_counts()
    print(f"\nEspécies no dataset de treinamento: {len(species_dist)}")
    
    # Distribuição de vocalizações
    voc_dist = training_df['vocalization_type'].value_counts().sort_index()
    print(f"\nDistribuição de tipos de vocalização:")
    for voc_type, count in voc_dist.items():
        percentage = (count / len(training_df)) * 100
        print(f"  Tipo {voc_type}: {count} ({percentage:.1f}%)")
    
    # Estatísticas de features
    print(f"\nEstatísticas de features de áudio:")
    print(f"  Duração (segundos):")
    print(f"    Média: {training_df['duration'].mean():.0f}")
    print(f"    Min: {training_df['duration'].min():.0f}")
    print(f"    Max: {training_df['duration'].max():.0f}")
    
    print(f"  RMS Energy:")
    print(f"    Média: {training_df['rms_energy'].mean():.4f}")
    print(f"    Min: {training_df['rms_energy'].min():.4f}")
    print(f"    Max: {training_df['rms_energy'].max():.4f}")
    
    print(f"  Zero Crossing Rate:")
    print(f"    Média: {training_df['zero_crossing_rate'].mean():.4f}")
    print(f"    Min: {training_df['zero_crossing_rate'].min():.4f}")
    print(f"    Max: {training_df['zero_crossing_rate'].max():.4f}")

def analyze_users(users_df, recordings_df, observations_df):
    """Analisa os utilizadores"""
    print("\n" + "="*60)
    print("ANÁLISE DE UTILIZADORES")
    print("="*60)
    
    print(f"\nTotal de utilizadores: {len(users_df)}")
    
    # Distribuição de roles
    roles = users_df['role'].value_counts()
    print(f"\nDistribuição de roles:")
    for role, count in roles.items():
        percentage = (count / len(users_df)) * 100
        print(f"  {role}: {count} ({percentage:.1f}%)")
    
    # Utilizadores ativos
    active_users = set(recordings_df['user_id'].unique()) | set(observations_df['user_id'].unique())
    print(f"\nUtilizadores ativos: {len(active_users)} ({len(active_users)/len(users_df)*100:.1f}%)")
    
    # Gravações por utilizador
    user_recordings = recordings_df['user_id'].value_counts()
    print(f"\nGravações por utilizador:")
    print(f"  Média: {user_recordings.mean():.1f}")
    print(f"  Máximo: {user_recordings.max()}")
    print(f"  Mínimo: {user_recordings.min()}")

def generate_data_quality_report(output_dir):
    """Gera relatório de qualidade dos dados"""
    print("\n" + "="*60)
    print("RELATÓRIO DE QUALIDADE DOS DADOS")
    print("="*60)
    
    quality_report = {
        'timestamp': pd.Timestamp.now().isoformat(),
        'checks': {
            'missing_values': {},
            'data_types': {},
            'value_ranges': {},
            'duplicates': {},
        }
    }
    
    # Verificar valores faltantes
    print("\nVerificando valores faltantes...")
    for csv_file in Path(output_dir).glob('*.csv'):
        df = pd.read_csv(csv_file)
        missing = df.isnull().sum()
        if missing.any():
            quality_report['checks']['missing_values'][csv_file.name] = missing.to_dict()
            print(f"  {csv_file.name}: {missing.sum()} valores faltantes")
        else:
            print(f"  {csv_file.name}: ✓ Sem valores faltantes")
    
    # Verificar duplicatas
    print("\nVerificando duplicatas...")
    for csv_file in Path(output_dir).glob('*.csv'):
        df = pd.read_csv(csv_file)
        duplicates = df.duplicated().sum()
        if duplicates > 0:
            quality_report['checks']['duplicates'][csv_file.name] = int(duplicates)
            print(f"  {csv_file.name}: {duplicates} duplicatas encontradas")
        else:
            print(f"  {csv_file.name}: ✓ Sem duplicatas")
    
    # Salvar relatório
    report_path = os.path.join(output_dir, 'data_quality_report.json')
    with open(report_path, 'w') as f:
        json.dump(quality_report, f, indent=2, default=str)
    
    print(f"\n✓ Relatório de qualidade salvo em: {report_path}")

def main():
    """Função principal"""
    output_dir = '/home/ubuntu/biolingo-datasets'
    
    print("\n" + "="*60)
    print("ANÁLISE EXPLORATÓRIA - DATASETS BIOLINGO")
    print("="*60)
    
    # Carregar datasets
    species_df = pd.read_csv(os.path.join(output_dir, 'species.csv'))
    recordings_df = pd.read_csv(os.path.join(output_dir, 'audio_recordings.csv'))
    results_df = pd.read_csv(os.path.join(output_dir, 'classification_results.csv'))
    observations_df = pd.read_csv(os.path.join(output_dir, 'observations.csv'))
    training_df = pd.read_csv(os.path.join(output_dir, 'ml_training_data.csv'))
    users_df = pd.read_csv(os.path.join(output_dir, 'users.csv'))
    
    # Executar análises
    analyze_species_distribution(species_df, recordings_df)
    analyze_geographic_distribution(recordings_df)
    analyze_habitat_distribution(recordings_df)
    analyze_quality_distribution(recordings_df)
    analyze_classification_results(results_df, species_df)
    analyze_observations(observations_df)
    analyze_ml_training_data(training_df, species_df)
    analyze_users(users_df, recordings_df, observations_df)
    generate_data_quality_report(output_dir)
    
    print("\n" + "="*60)
    print("✓ Análise concluída com sucesso!")
    print("="*60 + "\n")

if __name__ == '__main__':
    main()
