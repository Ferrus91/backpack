/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* @flow */

import React from 'react';
import {
  colorGray700,
  fontFamily,
  fontFamilyEmphasize,
  textEmphasizedFontWeight,
  textCapsFontSize,
  textCapsFontWeight,
  textSmFontSize,
  textSmFontWeight,
  textBaseFontSize,
  textBaseFontWeight,
  textLgFontSize,
  textLgFontWeight,
  textXlFontSize,
  textXlFontWeight,
  textXxlFontSize,
  textXxlFontWeight,
} from 'bpk-tokens/tokens/base.react.native';
import { Text, Platform, StyleSheet } from 'react-native';

import { shouldApplyFontWeightFix } from './font-weight-fix';
import { propTypes, defaultProps, type Props } from './common-types';

const TEXT_TOKENS = {
  textCapsFontSize: 10,
  textCapsFontWeight,
  textSmFontSize: 12,
  textSmFontWeight,
  textMdFontSize: 14,
  textMdFontWeight: '500',
  textBaseFontSize: 16,
  textBaseFontWeight,
  textLgFontSize: 20,
  textLgFontWeight,
  textXlFontSize: 24,
  textXlFontWeight,
  textXxlFontSize: 36,
  textXxlFontWeight,
  textXxxlFontSize: 42,
  textXxxlFontWeight: '500',
};

const getStyleByTextStyle = textStyle => {
  const camelCasedStyle = textStyle[0].toUpperCase() + textStyle.slice(1);

  const {
    [`text${camelCasedStyle}FontSize`]: fontSize,
    [`text${camelCasedStyle}FontWeight`]: fontWeight,
  } = TEXT_TOKENS;

  return {
    color: colorGray700,
    fontFamily,
    fontSize,
    fontWeight,
  };
};

const getEmphasizeProperties = () => {
  const emphasizeProperties = {};

  if (Platform.OS === 'android') {
    emphasizeProperties.fontFamily = fontFamilyEmphasize;
  } else {
    emphasizeProperties.fontWeight = textEmphasizedFontWeight;
  }

  return emphasizeProperties;
};

const styles = StyleSheet.create({
  caps: { ...getStyleByTextStyle('caps') },
  sm: { ...getStyleByTextStyle('sm') },
  md: { ...getStyleByTextStyle('md') },
  base: { ...getStyleByTextStyle('base') },
  lg: { ...getStyleByTextStyle('lg') },
  xl: { ...getStyleByTextStyle('xl') },
  xxl: { ...getStyleByTextStyle('xxl') },
  xxxl: { ...getStyleByTextStyle('xxxl') },
});

const BpkText = (props: Props) => {
  const { children, textStyle, style: userStyle, emphasize, ...rest } = props;

  const style = [styles[textStyle]];
  // Emphasize on iOS is not supported for the XXL size. This is also checked with
  // the `emphasizePropType` prop.
  const shouldEmpasize =
    emphasize !== 'regular' &&
    !(Platform.OS === 'ios' && textStyle.includes('xxl'));

  if (shouldEmpasize) {
    style.push(getEmphasizeProperties());

    if (shouldApplyFontWeightFix) {
      style.push({ fontWeight: '700' });
    }
  }

  if (shouldApplyFontWeightFix && textStyle.includes('xxl')) {
    style.push({ fontWeight: '800' });
  }

  if (userStyle) {
    style.push(userStyle);
  }

  return (
    // eslint-disable-next-line backpack/use-components
    <Text style={style} {...rest}>
      {children}
    </Text>
  );
};

BpkText.propTypes = { ...propTypes };

BpkText.defaultProps = { ...defaultProps };

export default BpkText;
