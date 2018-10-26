<?php

namespace Drupal\content_entity_builder\Plugin\BaseFieldConfig;

use Drupal\Core\Form\FormStateInterface;
use Drupal\content_entity_builder\ConfigurableBaseFieldConfigBase;
use Drupal\Core\Field\BaseFieldDefinition;
use Drupal\Core\Datetime\DrupalDateTime;

/**
 * TimestampItemBaseFieldConfig.
 *
 * @BaseFieldConfig(
 *   id = "timestamp_base_field_config",
 *   label = @Translation("Timestamp"),
 *   description = @Translation("An entity field containing a UNIX timestamp value."),
 *   field_type = "timestamp",
 * )
 */
class TimestampItemBaseFieldConfig extends ConfigurableBaseFieldConfigBase {

  /**
   * {@inheritdoc}
   */
  public function defaultConfiguration() {
    return [];
  }

  /**
   * {@inheritdoc}
   */
  public function buildConfigurationForm(array $form, FormStateInterface $form_state) {
    return [];
  }

  /**
   * {@inheritdoc}
   */
  public function buildBaseFieldDefinition() {
    $label = $this->getLabel();
    $weight = $this->getWeight();
    $default_value = $this->getDefaultValue();
    $required = $this->isRequired();
    $description = $this->getDescription();

    $base_field_definition = BaseFieldDefinition::create("timestamp")
      ->setLabel($label)
      ->setDescription($description)
      ->setRequired($required)
      ->setDefaultValue($default_value)
      ->setDisplayOptions('view', [
        'label' => 'above',
        'type' => 'timestamp',
        'weight' => $weight,
      ])
      ->setDisplayOptions('form', [
        'type' => 'datetime_timestamp',
        'weight' => $weight,
      ])
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);

    return $base_field_definition;
  }

  /**
   * {@inheritdoc}
   */
  public function buildDefaultValueForm(array $form, FormStateInterface $form_state) {
    $default_value = $this->getDefaultValue();
    $default_value_datetime = !empty($default_value) ? DrupalDateTime::createFromTimestamp($default_value) : '';

    $form['value'] = [
      '#type' => 'datetime',
      '#title' => $this->getFieldName(),
      '#default_value' => $default_value_datetime,
    ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function submitDefaultValueForm(array &$form, FormStateInterface $form_state) {
    $datetime = $form_state->getValue('value');
    if (!empty($datetime)) {
      $this->setDefaultValue($datetime->getTimestamp());
    }
  }

}
