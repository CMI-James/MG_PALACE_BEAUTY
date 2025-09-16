"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Product {
  id?: string;
  name: string;
  description: string;
  short_description: string;
  price: number;
  compare_price?: number;
  sku: string;
  quantity: number;
  category_id: string;
  image_url?: string;
  tags: string[];
  is_featured: boolean;
  is_active: boolean;
  slug: string;
}

interface ProductFormProps {
  categories: Category[];
  product?: Product;
}

export function ProductForm({ categories, product }: ProductFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Product>({
    name: product?.name || "",
    description: product?.description || "",
    short_description: product?.short_description || "",
    price: product?.price || 0,
    compare_price: product?.compare_price || 0,
    sku: product?.sku || "",
    quantity: product?.quantity || 0,
    category_id: product?.category_id || "",
    image_url: product?.image_url || "",
    tags: product?.tags || [],
    is_featured: product?.is_featured || false,
    is_active: product?.is_active || true,
    slug: product?.slug || "",
  });

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleInputChange = (field: keyof Product, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      ...(field === "name" && !product ? { slug: generateSlug(value) } : {}),
    }));
  };

  const handleTagsChange = (value: string) => {
    const tags = value
      .split(",")
      .map(tag => tag.trim())
      .filter(Boolean);
    setFormData(prev => ({ ...prev, tags }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const url = product
        ? `/api/admin/products/${product.id}`
        : "/api/admin/products";
      const method = product ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success(
          product
            ? "Product updated successfully"
            : "Product created successfully"
        );
        router.push("/admin/products");
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to save product");
      }
    } catch (error) {
      toast.error("Failed to save product");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={e => handleInputChange("name", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="sku">SKU</Label>
                <Input
                  id="sku"
                  value={formData.sku}
                  onChange={e => handleInputChange("sku", e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="short_description">Short Description</Label>
              <Input
                id="short_description"
                value={formData.short_description}
                onChange={e =>
                  handleInputChange("short_description", e.target.value)
                }
                placeholder="Brief product description"
              />
            </div>

            <div>
              <Label htmlFor="description">Full Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={e => handleInputChange("description", e.target.value)}
                rows={4}
                required
              />
            </div>

            <div>
              <Label htmlFor="image_url">Image URL</Label>
              <Input
                id="image_url"
                value={formData.image_url}
                onChange={e => handleInputChange("image_url", e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </CardContent>
        </Card>

        {/* Pricing & Inventory */}
        <Card>
          <CardHeader>
            <CardTitle>Pricing & Inventory</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="price">Price (₦)</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={e =>
                    handleInputChange("price", Number(e.target.value))
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="compare_price">Compare Price (₦)</Label>
                <Input
                  id="compare_price"
                  type="number"
                  value={formData.compare_price}
                  onChange={e =>
                    handleInputChange("compare_price", Number(e.target.value))
                  }
                />
              </div>
              <div>
                <Label htmlFor="quantity">Stock Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={e =>
                    handleInputChange("quantity", Number(e.target.value))
                  }
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category & Tags */}
        <Card>
          <CardHeader>
            <CardTitle>Category & Tags</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category_id}
                onValueChange={value => handleInputChange("category_id", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input
                id="tags"
                value={formData.tags.join(", ")}
                onChange={e => handleTagsChange(e.target.value)}
                placeholder="beauty, professional, tools"
              />
            </div>

            <div>
              <Label htmlFor="slug">URL Slug</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={e => handleInputChange("slug", e.target.value)}
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Product Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="is_featured"
                checked={formData.is_featured}
                onCheckedChange={checked =>
                  handleInputChange("is_featured", checked)
                }
              />
              <Label htmlFor="is_featured">Featured Product</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={checked =>
                  handleInputChange("is_active", checked)
                }
              />
              <Label htmlFor="is_active">Active (visible to customers)</Label>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex gap-4">
          <Button type="submit" disabled={isSubmitting} className="flex-1">
            {isSubmitting
              ? "Saving..."
              : product
                ? "Update Product"
                : "Create Product"}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
}
