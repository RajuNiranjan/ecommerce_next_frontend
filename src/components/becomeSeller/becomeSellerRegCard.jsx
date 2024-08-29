import React from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";

const BecomeSellerRegCard = () => {
  return (
    <div className=" w-full">
      <div>
        <p className="text-sm text-muted-foreground">
          Join our vibrant community of sellers and expand your reach.
        </p>
      </div>
      <form className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            placeholder="John Doe"
          />
        </div>
        <div>
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
          />
        </div>
        <div>
          <Label htmlFor="store-name">Store Name</Label>
          <Input
            id="store-name"
            name="store-name"
            type="text"
            required
            placeholder="Acme Clothing Co."
          />
        </div>
        <div>
          <Label htmlFor="description">Product Description</Label>
          <Textarea
            id="description"
            name="description"
            rows={3}
            required
            className="block w-full rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
            placeholder="Describe the products you sell..."
          />
        </div>
        <div>
          <Button type="submit" className="w-full">
            Apply to Become a Seller
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BecomeSellerRegCard;
